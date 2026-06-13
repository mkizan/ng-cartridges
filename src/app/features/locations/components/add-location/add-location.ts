import { Component, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal/modal-service';
import { TEXT } from '../../../../core/constants/text';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-location',
  imports: [MatButtonModule],
  templateUrl: './add-location.html',
  styleUrl: './add-location.scss',
})
export class AddLocation {
  modalService = inject(ModalService);
  protected readonly textAddCartridge = TEXT.buttons.add;
}
