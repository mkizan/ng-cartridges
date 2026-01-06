import {
  computed,
  DestroyRef,
  effect,
  inject,
  Injectable,
  OnInit,
  signal,
  untracked,
} from '@angular/core';
import {
  ICartridge,
  ICartridgeData,
  ICartridgeStatusCount,
  ICartridgeStatuses,
} from '../models/cartridge-interfaces';
import { cartridges } from '../../../dummy-data/dummy-cartridges';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../shared/utils/server-url';

@Injectable({
  providedIn: 'root',
})
export class CartridgesService {
  private httpClient = inject(HttpClient);

  // --- SIGNALS ---
  private cartridges = signal<ICartridge[]>([]);
  private cartridgeStatus = signal<ICartridgeStatuses[]>([
    { id: '1', status: 'заправлений' },
    { id: '2', status: 'на заправці' },
    { id: '3', status: 'в принтері' },
    { id: '4', status: 'закінчився' },
    { id: '5', status: 'в ремонті' },
    { id: '6', status: 'неробочий' },
  ]);
  // вираховує кількість картриджів відповідно до статусу
  private cartridgeStatusCounts = signal<ICartridgeStatusCount[]>([]);

  // --- READONLY SIGNALS для компонента ---
  allCartridges = this.cartridges.asReadonly();
  allCartridgeStatuses = this.cartridgeStatus.asReadonly();
  allCartridgeStatusCounts = this.cartridgeStatusCounts.asReadonly();

  constructor() {
    effect(() => {
      const carts = this.cartridges();
      const statuses = untracked(() => this.cartridgeStatus());
      const counts = new Map<string, number>();
      for (const c of carts)
        counts.set(c.status, (counts.get(c.status) ?? 0) + 1);

      this.cartridgeStatusCounts.set(
        statuses.map((s) => ({
          id: s.id,
          status: s.status,
          count: counts.get(s.status) ?? 0,
        }))
      );
    });
  }

  // вираховує загальну кількість картриджів по статусах
  totalCartridgesCount = computed(() =>
    this.cartridgeStatusCounts().reduce((acc, status) => acc + status.count, 0)
  );

  // updateStatusCounts(){}

  // --- LOAD DATA з бекенду ---
  loadCartridges() {
    this.httpClient.get<ICartridge[]>(`${BASE_URL}/cartridges`).subscribe({
      next: (data) => {
        this.cartridges.set(data);
        // this.updateStatusCounts();
      },
      error: (err) => console.error('Load error', err),
    });
  }

  changeCartridgeStatus(cartridgeData: { id: string; status: string }) {
    const prev = this.cartridges();

    this.cartridges.update((currentCartridge) =>
      currentCartridge.map((cartridge) =>
        cartridge.id === cartridgeData.id
          ? { ...cartridge, status: cartridgeData.status }
          : cartridge
      )
    );

    // this.updateStatusCounts();

    this.httpClient
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

  // --- CREATE ---
  addCartridge(cartridgeData: ICartridgeData) {
    const prev = this.cartridges();
    const newCartridge: ICartridge = {
      ...cartridgeData,
      id: crypto.randomUUID(),
    };

    this.cartridges.update((oldCartridges) => [...oldCartridges, newCartridge]);

    this.httpClient
      .post<ICartridge>(`${BASE_URL}/cartridges`, newCartridge)
      .subscribe({
        next: (saved) => {
          // якщо сервер повернув щось відмінне
          this.cartridges.update((items) =>
            items.map((cartridge) =>
              cartridge.id === newCartridge.id ? saved : cartridge
            )
          );
          // this.updateStatusCounts();
        },
        // rollback при помилці
        error: () => {
          this.cartridges.update((items) =>
            items.filter((cartridge) => cartridge.id !== newCartridge.id)
          );
          // this.updateStatusCounts();
        },
      });
  }

  // --- DELETE ---
  removeCartridge(id: string) {
    const prev = this.cartridges();

    this.cartridges.update((currentCartridges) =>
      currentCartridges.filter((cartridge) => cartridge.id !== id)
    );
    // this.updateStatusCounts();

    this.httpClient.delete(`${BASE_URL}/cartridges/${id}`).subscribe({
      error: () => {
        this.cartridges.set(prev);
        // this.updateStatusCounts();
      },
    });
  }
}
