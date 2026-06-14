import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartridgeCard } from '../cartridge-card/cartridge-card';
import { CartridgesService } from '../../services/cartridges-service';
import { CartridgeFilter } from '../cartridge-filter/cartridge-filter';
import { AddCartridge } from '../add-cartridge/add-cartridge';
import { CounterCartridges } from '../../../cartridge-dashboard/components/counter-cartridges/counter-cartridges';

@Component({
  selector: 'app-cartridge-list',
  imports: [CartridgeCard, CartridgeFilter, AddCartridge, CounterCartridges],
  templateUrl: './cartridge-list.html',
  styleUrl: './cartridge-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartridgeList {
  private cartridgesService = inject(CartridgesService);
  childFilteredCartridges = this.cartridgesService.filteredCartridges;
}
