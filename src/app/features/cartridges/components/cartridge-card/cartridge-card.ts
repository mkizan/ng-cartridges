import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { TranslateStatusPipe } from '../../../../shared/pipes/translate-status-pipe';
import { ICartridge } from '../../models/cartridge-interfaces';
import { CartridgesService } from '../../services/cartridges-service';

@Component({
  selector: 'app-cartridge-card',
  imports: [TranslateStatusPipe],
  templateUrl: './cartridge-card.html',
  styleUrl: './cartridge-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartridgeCard {
  cartridgesService = inject(CartridgesService);
  cartridgeStatus = this.cartridgesService.allCartridgeStatuses;

  cartridge = input.required<ICartridge>();
  changeCartridgeStatus = output<{ id: string; status: string }>();
  isActionsVisible = true;
  contentActionsBtn = viewChild<ElementRef<HTMLDivElement>>('actionsWrapper');

  selectStatus(status: string) {
    this.cartridgesService.changeCartridgeStatus({
      id: this.cartridge().id,
      status,
    });
  }

  toggleActionsBtn() {
    this.isActionsVisible = !this.isActionsVisible;
  }

  removeCartridge() {
    this.cartridgesService.removeCartridge(this.cartridge().id);
  }
}
