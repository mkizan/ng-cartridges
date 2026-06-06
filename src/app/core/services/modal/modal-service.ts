import { computed, effect, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export type ModalType = 'create' | 'edit' | null;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _activeModal = signal<{ type: ModalType; data?: any; id?: string;base?: string }>({
    type: null,
  });
  activeModal = this._activeModal.asReadonly();

  // stop scrolling when modal is open
  constructor(private router: Router) {
    effect(() => {
      const modal = this._activeModal();
      document.body.style.overflow =
        modal.type === 'create' || modal.type === 'edit' ? 'hidden' : '';
    });
  }

   // helper: return first non-empty segment or fallback
  private getBaseSegment(): string {
    const url = this.router.url.split('?')[0].split('#')[0];
    const segments = url.split('/').filter(Boolean);
    return segments[0] ?? 'cartridges';
  }

  openModalCreate() {
    const base = this.getBaseSegment();
    this.router
      .navigate([`/${base}/create`])
      .then(() => {
        this._activeModal.set({ type: 'create', base });
        console.log('mode is: ', this._activeModal());
      })
      .catch(() => {
        this._activeModal.set({ type: 'create', base });
      });
  }

  openModalEdit(itemData: any) {
    const base = this.getBaseSegment();
    this.router
      .navigate([`/${base}/edit/${itemData.id}`])
      .then(() => {
        this._activeModal.set({
          type: 'edit',
          data: itemData,
          id: itemData.id,
          base,
        });
        console.log('mode is: ', this._activeModal());
      })
      .catch(() => {
        this._activeModal.set({
          type: 'edit',
          data: itemData,
          id: itemData.id,
          base,
        });
      });
  }

  closeModal() {
    const base = this.getBaseSegment();
    this._activeModal.set({ type: null });
    this.router.navigate([`/${base}`]);
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay'))
      this.closeModal();
  }
}
