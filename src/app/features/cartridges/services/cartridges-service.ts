import {
  computed,
  effect,
  inject,
  Injectable,
  signal,
  untracked,
} from '@angular/core';
import {
  ICartridge,
  ICartridgeStatusCount,
  ICartridgeStatuses,
  CartridgeStatus,
  CARTRIDGE_STATUSES,
  IFilterCriteria,
} from '../models/cartridge-interfaces';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../shared/utils/server-url';

@Injectable({
  providedIn: 'root',
})
export class CartridgesService {
  private http = inject(HttpClient);

  // --- SIGNALS ---
  private cartridges = signal<ICartridge[]>([]);
  private cartridgeStatus = signal<ICartridgeStatuses[]>([
    { id: '1', status: CARTRIDGE_STATUSES.REFILLED },
    { id: '2', status: CARTRIDGE_STATUSES.REFILLING },
    { id: '3', status: CARTRIDGE_STATUSES.IN_PRINTER },
    { id: '4', status: CARTRIDGE_STATUSES.OUT },
    { id: '5', status: CARTRIDGE_STATUSES.REPAIR },
    { id: '6', status: CARTRIDGE_STATUSES.BROKEN },
  ]);
  // вираховує кількість картриджів відповідно до статусу
  private cartridgeStatusCounts = signal<ICartridgeStatusCount[]>([]);
  private activeFilters = signal<IFilterCriteria>({ query: '', status: null });
  private rawSearchQuery = signal('');

  // --- READONLY SIGNALS для компонента ---
  allCartridges = this.cartridges.asReadonly();
  allCartridgeStatuses = this.cartridgeStatus.asReadonly();
  allCartridgeStatusCounts = this.cartridgeStatusCounts.asReadonly();

  constructor() {
    effect((onCleanup) => {
      const carts = this.cartridges();
      const statuses = untracked(() => this.cartridgeStatus());
      const counts = new Map<string, number>();
      for (const c of carts) {
        const status = c.status as string;
        counts.set(status, (counts.get(status) ?? 0) + 1);
      }

      this.cartridgeStatusCounts.set(
        statuses.map((s) => ({
          id: s.id,
          status: s.status,
          count: counts.get(s.status) ?? 0,
        })),
      );

      // Debounced query filter
      const query = this.rawSearchQuery();
      const timeout = setTimeout(() => {
        this.activeFilters.update((f) => ({ ...f, query }));
        console.log('Active filters changed: ', this.activeFilters());
      }, 500);
      onCleanup(() => clearTimeout(timeout));
    });
  }

  // вираховує загальну кількість картриджів по статусах
  totalCartridgesCount = computed(() =>
    this.cartridgeStatusCounts().reduce((acc, status) => acc + status.count, 0),
  );

  // updateStatusCounts(){}

  private isValidStatus(s: any): s is CartridgeStatus {
    return Object.values(CARTRIDGE_STATUSES).includes(s as CartridgeStatus);
  }

  changeCartridgeStatus(cartridgeData: {
    id: string;
    status: CartridgeStatus | string;
  }) {
    if (!this.isValidStatus(cartridgeData.status)) {
      console.warn('Invalid status:', cartridgeData.status);
      return;
    }

    const prev = this.cartridges();

    this.cartridges.update((currentCartridge) =>
      currentCartridge.map((cartridge) =>
        cartridge.id === cartridgeData.id
          ? { ...cartridge, status: cartridgeData.status as CartridgeStatus }
          : cartridge,
      ),
    );

    // this.updateStatusCounts();

    this.http
      .patch(`${BASE_URL}/cartridges/${cartridgeData.id}`, {
        status: cartridgeData.status,
      })
      .subscribe({
        error: () => {
          this.cartridges.set(prev);
          // this.updateStatusCounts();
        },
      });
  }

  // Метод для оновлення фільтрів
  updateSearchQuery(value: string) {
    this.rawSearchQuery.set(value);
  }
  updateStatusFilter(status: string | null) {
    this.activeFilters.update((f) => ({ ...f, status }));
  }

  // Логіка фільтрації картриджів
  filteredCartridges = computed(() => {
    const query = this.activeFilters().query.toLowerCase().trim();
    const status = this.activeFilters().status;

    return this.allCartridges().filter((cartridge) => {
      const matchesBrand = query
        ? cartridge.brand.toLowerCase().includes(query)
        : true;
      const matchesModel = query
        ? cartridge.model.toLowerCase().includes(query)
        : true;
      const matchesStatus = status ? cartridge.status === status : true;

      return (matchesBrand || matchesModel) && matchesStatus;
    });
  });

  // --- CREATE ---
  addCartridge(cartridgeData: Omit<ICartridge, 'id'>) {
    const prev = this.cartridges();
    // Create a temporary placeholder with a temp ID for optimistic update
    const tempId = `temp-${Date.now()}`;
    const tempCartridge: ICartridge = {
      ...cartridgeData,
      id: tempId,
    };

    // Add to UI immediately for better UX
    this.cartridges.update((oldCartridges) => [
      ...oldCartridges,
      tempCartridge,
    ]);

    // Send only the cartridge data WITHOUT id - MongoDB will generate _id
    this.http
      .post<ICartridge>(`${BASE_URL}/cartridges`, cartridgeData)
      .subscribe({
        next: (saved) => {
          // Replace temporary cartridge with server response (which includes MongoDB's generated _id)
          this.cartridges.update((items) =>
            items.map((cartridge) =>
              cartridge.id === tempId ? saved : cartridge,
            ),
          );
          // this.updateStatusCounts();
          console.log('Cartridges after request: ', this.cartridges());
        },
        // rollback при помилці
        error: () => {
          this.cartridges.update((items) =>
            items.filter((cartridge) => cartridge.id !== tempId),
          );
          // this.updateStatusCounts();
        },
      });
  }

  // --- READ ---
  loadCartridges() {
    this.http.get<any[]>(`${BASE_URL}/cartridges`).subscribe({
      next: (data) => {
        const normalized = data.map((d) => ({
          ...d,
          status: this.isValidStatus(d.status)
            ? d.status
            : CARTRIDGE_STATUSES.EMPTY,
        })) as ICartridge[];
        this.cartridges.set(normalized);
        // this.updateStatusCounts();
      },
      error: (err) => console.error('Load error', err),
    });
  }

  // --- UPDATE ---
  editCartridge(id: string, cartridge: Omit<ICartridge, 'id'>) {
    this.http
      .patch<ICartridge>(`${BASE_URL}/cartridges/${id}`, {
        ...cartridge,
      })
      .subscribe({
        next: (editedCartridge: ICartridge) => {
          this.cartridges.update((items) =>
            items.map((item) =>
              item.id === editedCartridge.id
                ? { ...item, ...editedCartridge }
                : item,
            ),
          );
        },
        error: () =>
          this.cartridges.update((items) =>
            items.filter((value) => value.id !== id),
          ),
      });
  }

  // --- DELETE ---
  removeCartridge(id: string) {
    const prev = this.cartridges();

    this.cartridges.update((currentCartridges) =>
      currentCartridges.filter((cartridge) => cartridge.id !== id),
    );
    // this.updateStatusCounts();

    this.http.delete(`${BASE_URL}/cartridges/${id}`).subscribe({
      error: () => {
        this.cartridges.set(prev);
        // this.updateStatusCounts();
      },
    });
  }
}
