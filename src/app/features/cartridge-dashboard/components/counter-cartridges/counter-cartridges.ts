import { Component, inject } from '@angular/core';
import { CartridgesService } from '../../../cartridges/services/cartridges-service';
import { TranslateStatusPipe } from '../../../../shared/pipes/translate-status-pipe';
import { LucideAngularModule, ChartNoAxesCombined } from 'lucide-angular';

@Component({
  selector: 'app-counter-cartridges',
  imports: [TranslateStatusPipe, LucideAngularModule],
  templateUrl: './counter-cartridges.html',
  styleUrl: './counter-cartridges.css',
})
export class CounterCartridges {
  readonly ChartNoAxesCombined = ChartNoAxesCombined;

  cartridgesService = inject(CartridgesService);
  cartridges = this.cartridgesService.allCartridges;
  countCartridgesByStatus = this.cartridgesService.allCartridgeStatusCounts;
}
