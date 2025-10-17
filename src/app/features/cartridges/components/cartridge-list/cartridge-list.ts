import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartridgeCard } from '../cartridge-card/cartridge-card';
import { CartridgesService } from '../../services/cartridges-service';

@Component({
  selector: 'app-cartridge-list',
  imports: [CartridgeCard],
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
