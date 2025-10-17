import { Component, inject } from '@angular/core';
import { CartridgeForm } from '../cartridge-form/cartridge-form';
import { ModalService } from '../../../../core/services/modal-service';
import { Modal } from '../../../../shared/components/modal/modal/modal';

@Component({
  selector: 'app-add-cartridge',
  imports: [CartridgeForm, Modal],
  templateUrl: './add-cartridge.html',
  styleUrl: './add-cartridge.css',
})
export class AddCartridge {
  modalService = inject(ModalService);
}
