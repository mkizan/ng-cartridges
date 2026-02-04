import { Component, inject } from '@angular/core';
import { CartridgeForm } from '../cartridge-form/cartridge-form';
import { ModalService } from '../../../../core/services/modal/modal-service';
import { Modal } from '../../../../shared/components/modal/modal/modal';

@Component({
  selector: 'app-add-cartridge-button',
  imports: [CartridgeForm, Modal],
  templateUrl: './add-cartridge-button.html',
  styleUrl: './add-cartridge-button.css',
})
export class AddCartridgeButton {
  modalService = inject(ModalService);
}
