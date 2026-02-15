import { Component, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal/modal-service';
import { TEXT } from '../../../../core/constants/text';

@Component({
  selector: 'app-add-cartridge-button',
  // imports: [CartridgeForm, Modal],
  templateUrl: './add-cartridge-button.html',
  styleUrl: './add-cartridge-button.css',
})
export class AddCartridgeButton {
  modalService = inject(ModalService);
  protected readonly textAddCartridge = TEXT.buttons.addCartridge;
}
