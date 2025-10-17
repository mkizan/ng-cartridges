import { Component, HostListener, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal-service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  modalService = inject(ModalService);

  @HostListener('document:keydown.escape') handleOverlayKeydownEscape() {
    if (this.modalService.read_IsOpen()) this.modalService.toggleModalBtn();
  }
}
