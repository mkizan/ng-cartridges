import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Cartridge } from '../cartridge/cartridge';
import { CartridgesService } from '../../services/cartridges-service';

@Component({
  selector: 'app-cartridge-list',
  imports: [Cartridge],
  templateUrl: './cartridge-list.html',
  styleUrl: './cartridge-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartridgeList {
  cartridgesService = inject(CartridgesService);
  cartridges = this.cartridgesService.allCartridges;

  // logCartridges() {
  //   console.log('Current cartridges:', this.cartridges());
  // }
}
