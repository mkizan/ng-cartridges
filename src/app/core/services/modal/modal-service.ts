import { computed, effect, Injectable, signal } from '@angular/core';

export type ModalType = 'create-cartridge' | 'edit-cartridge' | null;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _activeModal = signal<{ type: ModalType; data?: any }>({
    type: null,
  });
  activeModal = this._activeModal.asReadonly();

  // stop scrolling when modal is open
  constructor() {
    effect(() => {
      const modal = this._activeModal();
      document.body.style.overflow =
        modal.type === 'create-cartridge' || modal.type === 'edit-cartridge'
          ? 'hidden'
          : '';
    });
  }

  openModalCreate() {
    this._activeModal.set({ type: 'create-cartridge' });
  }

  openModalEdit(cartridgeData: any) {
    this._activeModal.set({ type: 'edit-cartridge', data: cartridgeData });
  }

  closeModal() {
    this._activeModal.set({ type: null });
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay'))
      this.closeModal();
  }
}
