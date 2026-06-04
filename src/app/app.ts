import { Component, inject, signal } from '@angular/core';
import { Theme } from './core/components/theme/theme';
import { ModalService } from './core/services/modal/modal-service';
import { TEXT } from './core/constants/text';
import { Modal } from './shared/components/modal/modal/modal';
import { CartridgesService } from './features/cartridges/services/cartridges-service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    Theme,
    Modal,
    FormsModule,
    RouterOutlet,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  cartridges = inject(CartridgesService);
  modalService = inject(ModalService);

  protected readonly TEXT = TEXT;
  protected readonly title = signal('ng-cartridges');

  constructor() {
    this.cartridges.loadCartridges();
  }
}
