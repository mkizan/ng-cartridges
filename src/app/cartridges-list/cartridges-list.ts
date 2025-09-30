import { Component, signal } from '@angular/core';
import { Cartridge, ICartridge } from './cartridge/cartridge';
import { cartridges } from '../dummy-data/dummy-cartridges';

@Component({
  selector: 'app-cartridges-list',
  imports: [Cartridge],
  templateUrl: './cartridges-list.html',
  styleUrl: './cartridges-list.css',
})
export class CartridgesList {
  cartridges = signal<ICartridge[]>(cartridges);

  changeCartridgeStatus(obj: { id: number; status: string }) {
    console.log('Updating cartridge:', obj);

    this.cartridges.update((currentCartridges) =>
      currentCartridges.map((cartridge) =>
        cartridge.id === obj.id
          ? { ...cartridge, status: obj.status }
          : cartridge
      )
    );
  }

  logCartridges() {
    console.log('Current cartridges:', this.cartridges());
  }
}
