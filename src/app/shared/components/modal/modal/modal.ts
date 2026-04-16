import { Component, computed, HostListener, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal/modal-service';
import { CartridgeForm } from '../../../../features/cartridges/components/cartridge-form/cartridge-form';
import { TEXT } from '../../../../core/constants/text';

@Component({
  selector: 'app-modal',
  imports: [CartridgeForm],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  modalService = inject(ModalService);
  protected readonly TEXT = TEXT;

  isOpen = computed(() => this.modalService.activeModal().type !== null);

  @HostListener('document:keydown.escape') handleOverlayKeydownEscape() {
    // if (this.modalService.read_IsOpen()) this.modalService.toggleModalBtn();
    if (this.modalService.activeModal().type !== null) {
      this.modalService.closeModal();
    }
  }
}
