import {
  Component,
  input,
  ChangeDetectionStrategy,
  inject,
  DestroyRef,
} from '@angular/core';
import { ILocation } from '../../models/location-interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocationsService } from '../../services/locations-service';
import { ModalService } from '../../../../core/services/modal/modal-service';
import { DialogService } from '../../../../core/services/confirm-dialog/dialog-service';
import { TEXT } from '../../../../core/constants/text';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-location-card',
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './location-card.html',
  styleUrl: './location-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationCard {
  protected readonly TEXT = TEXT;
  locationsService = inject(LocationsService);
  modalService = inject(ModalService);
  dialogService = inject(DialogService);
  destroyRef = inject(DestroyRef);
  location = input.required<ILocation>();

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
          this.locationsService.removeLocation(this.location().id);
        }
      });
  }
}
