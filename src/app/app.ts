import { Component, computed, effect, inject, signal } from '@angular/core';
import { CounterCartridges } from './features/cartridge-dashboard/components/counter-cartridges/counter-cartridges';
import { CartridgeList } from './features/cartridges/components/cartridge-list/cartridge-list';

import { Theme } from './core/components/theme/theme';
import { AddCartridgeButton } from './features/cartridges/components/add-cartridge-button/add-cartridge-button';
import { ModalService } from './core/services/modal/modal-service';
import { CartridgeForm } from './features/cartridges/components/cartridge-form/cartridge-form';
import { TEXT } from './core/constants/text';
import { Modal } from './shared/components/modal/modal/modal';
import { CartridgeFilter } from './features/cartridges/components/cartridge-filter/cartridge-filter';
import { CartridgesService } from './features/cartridges/services/cartridges-service';
import {
  ICartridge,
  IFilterCriteria,
} from './features/cartridges/models/cartridge-interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    CounterCartridges,
    CartridgeList,
    AddCartridgeButton,
    Theme,
    CartridgeForm,
    Modal,
    FormsModule,
    CartridgeFilter,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  cartridges = inject(CartridgesService);
  modalService = inject(ModalService);

  protected readonly TEXT = TEXT;
  protected readonly title = signal('ng-cartridges');

  activeFilters = signal<IFilterCriteria>({ query: '', status: null });
  debouncedSearchQuery = signal('');

  constructor() {
    // Завантажуємо картриджі при ініціалізації додатку
    this.cartridges.loadCartridges();

    // Debounce ефект для пошукового запиту
    effect((onCleanup) => {
      const value = this.activeFilters().query;
      console.log('Active filters changed: ', this.activeFilters());
      const timeout = setTimeout(() => {
        this.debouncedSearchQuery.set(value);
      }, 500);
      onCleanup(() => clearTimeout(timeout));
    });
  }

  // Логіка мультифільтрування картриджів
  filteredCartridges = computed(() => {
    const query = this.debouncedSearchQuery().toLowerCase().trim();
    const status = this.activeFilters().status;

    return this.cartridges.allCartridges().filter((cartridge) => {
      const matchesBrand = query
        ? cartridge.brand.toLowerCase().includes(query)
        : true;
      const matchesModel = query
        ? cartridge.model.toLowerCase().includes(query)
        : true;
      const matchesStatus = status ? cartridge.status === status : true;

      return (matchesBrand || matchesModel) && matchesStatus;
    });
  });
}
