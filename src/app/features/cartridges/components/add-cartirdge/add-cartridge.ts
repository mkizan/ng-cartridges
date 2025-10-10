import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { CartridgesService } from '../../services/cartridges-service';
import { FormCartridge } from '../form-cartridge/form-cartridge';

@Component({
  selector: 'app-add-cartridge',
  imports: [FormCartridge],
  templateUrl: './add-cartridge.html',
  styleUrl: './add-cartridge.css',
})
export class AddCartridge {
  cartridgeService = inject(CartridgesService);
  contentModalBtn = viewChild<ElementRef<HTMLDivElement>>('modalOverlay');

  private _isOpen = signal(false);
  readonly isOpen = computed(() => this._isOpen());

  constructor() {
    effect(() => {
      const open = this._isOpen();
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }
  toggleModalBtn() {
    this._isOpen.update((value) => !value);
  }
  @HostListener('document:keydown.escape') handleOverlayKeydownEscape() {
    if (this._isOpen()) this.toggleModalBtn();
  }

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  handleOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay'))
      this.toggleModalBtn();
  }
}
