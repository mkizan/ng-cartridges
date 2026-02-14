import { computed, effect, Injectable, signal } from '@angular/core';

export type ModalType = 'create-cartridge' | 'edit-cartridge' | null;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _activeModal = signal<{ type: ModalType }>({
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
    console.log('Type of modal: ', this._activeModal().type);
  }

  openModalEdit() {
    this._activeModal.set({ type: 'edit-cartridge' });
    console.log('Type of modal: ', this._activeModal().type);
  }

  closeModal() {
    this._activeModal.set({ type: null });
    console.log(this._activeModal().type);
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay'))
      this.closeModal();
  }

  // private _isOpen = signal(false);
  // readonly isOpen = computed(() => this._isOpen());

  // read_IsOpen = this._isOpen.asReadonly();

  // constructor() {
  //   effect(() => {
  //     const open = this._isOpen();
  //     document.body.style.overflow = open ? 'hidden' : '';
  //   });
  // }
  // toggleModalBtn() {
  //   this._isOpen.update((value) => !value);
  // }

  // ngOnDestroy() {
  //   document.body.style.overflow = '';
  // }

  // handleOverlayClick(event: MouseEvent) {
  //   if ((event.target as HTMLElement).classList.contains('modal-overlay'))
  //     console.log('Overlay clicked: ', this._isOpen());
  //   this.toggleModalBtn();
  //   // console.log('Overlay clicked: ', this._isOpen());
  // }
}
