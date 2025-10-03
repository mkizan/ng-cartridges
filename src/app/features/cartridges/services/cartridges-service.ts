import { computed, effect, Injectable, signal, untracked } from '@angular/core';
import {
  ICartridge,
  ICartridgeData,
  ICartridgeStatuses,
} from '../models/cartridge-interfaces';
import { cartridges } from '../../../dummy-data/dummy-cartridges';

@Injectable({
  providedIn: 'root',
})
export class CartridgesService {
  private cartridges = signal<ICartridge[]>(cartridges);
  private cartridgeStatus = signal<ICartridgeStatuses[]>([
    { id: '1', status: 'заправлений' },
    { id: '2', status: 'на заправці' },
    { id: '3', status: 'в принтері' },
    { id: '4', status: 'закінчився' },
    { id: '5', status: 'в ремонті' },
    { id: '6', status: 'неробочий' },
  ]);
  totalCartridgesCount = signal(0);

  allCartridges = this.cartridges.asReadonly();
  allCartridgeStatuses = this.cartridgeStatus.asReadonly();

  // вираховує кількість картриджів по статусах
  cartridgeStatusCounts = signal<
    Array<{ id: string; status: string; count: number }>
  >([]);
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

  changeCartridgeStatus(cartridgeData: { id: string; status: string }) {
    this.cartridges.update((currentCartridges) =>
      currentCartridges.map((cartridge) =>
        cartridge.id === cartridgeData.id
          ? { ...cartridge, status: cartridgeData.status }
          : cartridge
      )
    );
  }

  addCartridge(cartridgeData: ICartridgeData) {
    const newCartridge: ICartridge = {
      ...cartridgeData,
      id: crypto.randomUUID(),
      status: 'заправлений',
    };

    this.cartridges.update((oldCartridges) => [...oldCartridges, newCartridge]);
  }

  removeCartridge(id: string) {
    this.cartridges.update((currentCartridges) =>
      currentCartridges.filter((cartridge) => cartridge.id !== id)
    );
    console.log(this.cartridgeStatusCounts());
  }
}
