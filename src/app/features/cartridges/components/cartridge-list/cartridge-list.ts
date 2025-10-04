import { Component, inject, signal } from '@angular/core';
import { Cartridge } from '../cartridge/cartridge';
import { cartridges } from '../../../../dummy-data/dummy-cartridges';
import { ICartridge } from '../../models/cartridge-interfaces';
import { CartridgesService } from '../../services/cartridges-service';

@Component({
  selector: 'app-cartridge-list',
  imports: [Cartridge],
  templateUrl: './cartridge-list.html',
  styleUrl: './cartridge-list.css',
})
export class CartridgeList {
  cartridgesService = inject(CartridgesService);
  cartridges = this.cartridgesService.allCartridges;

  logCartridges() {
    console.log('Current cartridges:', this.cartridges());
  }
}
