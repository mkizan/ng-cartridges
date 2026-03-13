import { computed, effect, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export type ModalType = 'create' | 'edit' | null;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _activeModal = signal<{ type: ModalType; data?: any; id?: string }>({
    type: null,
  });
  activeModal = this._activeModal.asReadonly();

  // stop scrolling when modal is open
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    effect(() => {
      const modal = this._activeModal();
      document.body.style.overflow =
        modal.type === 'create' || modal.type === 'edit' ? 'hidden' : '';
    });
  }

  // ngOnInit() {
  //   this._activeModal.set({ type: this.route.snapshot.data['mode'] });
  //   console.log('mode is: ', this._activeModal());
  // }

  openModalCreate() {
    this.router
      .navigate(['/cartridges/create'])
      .then(() => {
        this._activeModal.set({ type: 'create' });
        console.log('mode is: ', this._activeModal());
      })
      .catch(() => {
        this._activeModal.set({ type: 'create' });
      });
  }

  openModalEdit(cartridgeData: any) {
    this.router
      .navigate([`/cartridges/edit/${cartridgeData.id}`])
      .then(() => {
        this._activeModal.set({
          type: 'edit',
          data: cartridgeData,
          id: cartridgeData.id,
        });
        console.log('mode is: ', this._activeModal());
      })
      .catch(() => {
        this._activeModal.set({
          type: 'edit',
          data: cartridgeData,
          id: cartridgeData.id,
        });
      });
  }

  closeModal() {
    this._activeModal.set({ type: null });
    this.router.navigate(['/cartridges']);
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay'))
      this.closeModal();
  }
}
