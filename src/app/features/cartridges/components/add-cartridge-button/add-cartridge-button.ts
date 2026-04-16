import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ModalService } from '../../../../core/services/modal/modal-service';
import { TEXT } from '../../../../core/constants/text';

@Component({
  selector: 'app-add-cartridge-button',
  imports: [MatButtonModule],
  templateUrl: './add-cartridge-button.html',
  styleUrl: './add-cartridge-button.scss',
})
export class AddCartridgeButton {
  modalService = inject(ModalService);
  protected readonly textAddCartridge = TEXT.buttons.addCartridge;
}
