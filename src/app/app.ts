import { Component, inject, signal } from '@angular/core';
import { CounterCartridges } from './features/cartridge-dashboard/components/counter-cartridges/counter-cartridges';
import { CartridgeList } from './features/cartridges/components/cartridge-list/cartridge-list';

import { Theme } from './core/components/theme/theme';
import { AddCartridgeButton } from './features/cartridges/components/add-cartridge-button/add-cartridge-button';
import { ModalService } from './core/services/modal/modal-service';
import { CartridgeForm } from './features/cartridges/components/cartridge-form/cartridge-form';
import { TEXT } from './core/constants/text';
import { Modal } from './shared/components/modal/modal/modal';

@Component({
  selector: 'app-root',
  imports: [
    CounterCartridges,
    CartridgeList,
    AddCartridgeButton,
    Theme,
    CartridgeForm,
    Modal,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  modalService = inject(ModalService);
  protected readonly TEXT = TEXT;

  protected readonly title = signal('ng-cartridges');
}
