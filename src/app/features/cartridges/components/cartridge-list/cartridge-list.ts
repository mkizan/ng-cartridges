import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CartridgeCard } from '../cartridge-card/cartridge-card';
import { ICartridge } from '../../models/cartridge-interfaces';

@Component({
  selector: 'app-cartridge-list',
  imports: [CartridgeCard],
  templateUrl: './cartridge-list.html',
  styleUrl: './cartridge-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartridgeList {
  childFilteredCartridges = input.required<ICartridge[]>();
}
