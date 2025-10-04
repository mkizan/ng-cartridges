import { Component, computed, inject } from '@angular/core';
import { CartridgesService } from '../../../cartridges/services/cartridges-service';
import { TranslateStatusPipe } from '../../../../shared/pipes/translate-status-pipe';

@Component({
  selector: 'app-counter-cartridges',
  imports: [TranslateStatusPipe],
  templateUrl: './counter-cartridges.html',
  styleUrl: './counter-cartridges.css',
})
export class CounterCartridges {
  cartridgesService = inject(CartridgesService);
  cartridges = this.cartridgesService.allCartridges;
  countCartridgesByStatus = this.cartridgesService.allCartridgeStatusCounts;
}
