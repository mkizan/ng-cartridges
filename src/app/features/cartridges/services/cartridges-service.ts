import { Injectable, signal } from '@angular/core';
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

  allCartridges = this.cartridges.asReadonly();
  allCartridgeStatuses = this.cartridgeStatus.asReadonly();

  addCartridge(cartridgeData: ICartridgeData) {
    const newCartridge: ICartridge = {
      ...cartridgeData,
      id: crypto.randomUUID(),
      status: 'заправлений',
    };

    this.cartridges.update((oldCartridges) => [...oldCartridges, newCartridge]);
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
}
