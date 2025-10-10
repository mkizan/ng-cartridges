import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { CartridgesService } from '../../../services/cartridges-service';

@Component({
  selector: 'app-add-cartridge',
  imports: [],
  templateUrl: './add-cartridge.html',
  styleUrl: './add-cartridge.css',
})
export class AddCartridge {
  cartridgeService = inject(CartridgesService);
  contentModalBtn = viewChild<ElementRef<HTMLDivElement>>('modalOverlay');

  toggleModalBtn() {
    this.contentModalBtn()?.nativeElement.classList.toggle('is-open');
  }

  handleOverlayClick(event: MouseEvent) {
    // Only close if the overlay itself was clicked, not its children
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.toggleModalBtn();
    }
  }
}
