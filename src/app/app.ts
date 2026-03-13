import { Component, computed, effect, inject, signal } from '@angular/core';
import { CounterCartridges } from './features/cartridge-dashboard/components/counter-cartridges/counter-cartridges';

import { Theme } from './core/components/theme/theme';
import { AddCartridgeButton } from './features/cartridges/components/add-cartridge-button/add-cartridge-button';
import { ModalService } from './core/services/modal/modal-service';
import { CartridgeForm } from './features/cartridges/components/cartridge-form/cartridge-form';
import { TEXT } from './core/constants/text';
import { Modal } from './shared/components/modal/modal/modal';
import { CartridgeFilter } from './features/cartridges/components/cartridge-filter/cartridge-filter';
import { CartridgesService } from './features/cartridges/services/cartridges-service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    CounterCartridges,
    AddCartridgeButton,
    Theme,
    CartridgeForm,
    Modal,
    FormsModule,
    CartridgeFilter,
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

  // activeFilters = signal<IFilterCriteria>({ query: '', status: null });
  // debouncedSearchQuery = signal('');

  constructor() {
    // Завантажуємо картриджі при ініціалізації додатку
    this.cartridges.loadCartridges();

    // Debounce ефект для пошукового запиту
    // effect((onCleanup) => {
    //   const value = this.activeFilters().query;
    //   console.log('Active filters changed: ', this.activeFilters());
    //   const timeout = setTimeout(() => {
    //     this.debouncedSearchQuery.set(value);
    //   }, 500);
    //   onCleanup(() => clearTimeout(timeout));
    // });
  }
}
