import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { CartridgeCard } from '../cartridge-card/cartridge-card';
import { ICartridge } from '../../models/cartridge-interfaces';
import { CartridgesService } from '../../services/cartridges-service';

@Component({
  selector: 'app-cartridge-list',
  imports: [CartridgeCard],
  templateUrl: './cartridge-list.html',
  styleUrl: './cartridge-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartridgeList {
  private cartridgesService = inject(CartridgesService);
  childFilteredCartridges = this.cartridgesService.filteredCartridges;
  // childFilteredCartridges = input.required<ICartridge[]>();
}
