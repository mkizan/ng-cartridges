import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CartridgeCard } from '../cartridge-card/cartridge-card';
import { CartridgesService } from '../../services/cartridges-service';

@Component({
  selector: 'app-cartridge-list',
  imports: [CartridgeCard],
  templateUrl: './cartridge-list.html',
  styleUrl: './cartridge-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartridgeList implements OnInit {
  constructor(public service: CartridgesService) {}

  ngOnInit(): void {
    this.service.loadCartridges();
  }
  // cartridgesService = inject(CartridgesService);
  // cartridges = this.cartridgesService.allCartridges;

  // logCartridges() {
  //   console.log('Current cartridges:', this.cartridges());
  // }
}
