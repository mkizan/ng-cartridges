import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateStatusPipe } from '../../../../shared/pipes/translate-status-pipe';
import { ICartridge } from '../../models/cartridge-interfaces';
import { CartridgesService } from '../../services/cartridges-service';
import { ModalService } from '../../../../core/services/modal/modal-service';
import { TEXT } from '../../../../core/constants/text';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { DialogService } from '../../../../core/services/confirm-dialog/dialog-service';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-cartridge-card',
  imports: [TranslateStatusPipe, MatIconModule, DatePipe, MatTooltip],
  templateUrl: './cartridge-card.html',
  styleUrl: './cartridge-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartridgeCard {
  protected readonly TEXT = TEXT;
  modalService = inject(ModalService);
  dialogService = inject(DialogService);
  destroyRef = inject(DestroyRef);
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

  openDialog() {
    this.dialogService
      .confirmDialog({
        title: TEXT.dialog.deleteTitle,
        message: TEXT.dialog.message,
        confirmLabel: TEXT.dialog.yesBtn,
        cancelLabel: TEXT.dialog.noBtn,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((confirmed) => {
        if (confirmed) {
          this.cartridgesService.removeCartridge(this.cartridge().id);
        }
      });
  }
}
