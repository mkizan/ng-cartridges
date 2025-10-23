import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _isOpen = signal(false);
  readonly isOpen = computed(() => this._isOpen());

  read_IsOpen = this._isOpen.asReadonly();

  constructor() {
    effect(() => {
      const open = this._isOpen();
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }
  toggleModalBtn() {
    this._isOpen.update((value) => !value);
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay'))
      this.toggleModalBtn();
  }
}
