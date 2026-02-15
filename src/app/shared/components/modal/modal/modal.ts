import {
  Component,
  computed,
  HostListener,
  inject,
  input,
} from '@angular/core';
import {
  ModalService,
  ModalType,
} from '../../../../core/services/modal/modal-service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  modalService = inject(ModalService);
  modalType = input.required<ModalType>();

  isOpen = computed(
    () => this.modalService.activeModal().type === this.modalType(),
  );

  @HostListener('document:keydown.escape') handleOverlayKeydownEscape() {
    // if (this.modalService.read_IsOpen()) this.modalService.toggleModalBtn();
    if (this.modalService.activeModal().type !== null) {
      this.modalService.closeModal();
    }
  }
}
