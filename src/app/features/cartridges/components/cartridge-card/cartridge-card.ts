import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import { TranslateStatusPipe } from '../../../../shared/pipes/translate-status-pipe';
import { ICartridge } from '../../models/cartridge-interfaces';
import { CartridgesService } from '../../services/cartridges-service';
import { ModalService } from '../../../../core/services/modal/modal-service';
import { TEXT } from '../../../../core/constants/text';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cartridge-card',
  imports: [TranslateStatusPipe, MatIconModule, DatePipe],
  templateUrl: './cartridge-card.html',
  styleUrl: './cartridge-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartridgeCard {
  protected readonly TEXT = TEXT;
  modalService = inject(ModalService);
  cartridgesService = inject(CartridgesService);
  cartridgeStatus = this.cartridgesService.allCartridgeStatuses;

  cartridge = input.required<ICartridge>();
  changeCartridgeStatus = output<{ id: string; status: string }>();

  selectStatus(status: string) {
    this.cartridgesService.changeCartridgeStatus({
      id: this.cartridge().id,
      status,
    });
  }

  removeCartridge() {
    this.cartridgesService.removeCartridge(this.cartridge().id);
  }
}
