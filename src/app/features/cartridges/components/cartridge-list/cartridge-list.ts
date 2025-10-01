import { Component, signal } from '@angular/core';
import { Cartridge } from '../cartridge/cartridge';
import { cartridges } from '../../../../dummy-data/dummy-cartridges';
import { ICartridge } from '../../models/cartridge-interfaces';

@Component({
  selector: 'app-cartridge-list',
  imports: [Cartridge],
  templateUrl: './cartridge-list.html',
  styleUrl: './cartridge-list.css',
})
export class CartridgeList {
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
