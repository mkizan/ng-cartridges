import { Component, signal } from '@angular/core';
import { CounterCartridges } from './features/cartridge-dashboard/components/counter-cartridges/counter-cartridges';
import { CartridgeList } from './features/cartridges/components/cartridge-list/cartridge-list';

import { Theme } from './core/components/theme/theme';
import { AddCartridgeButton } from './features/cartridges/components/add-cartridge-button/add-cartridge-button';

@Component({
  selector: 'app-root',
  imports: [CounterCartridges, CartridgeList, AddCartridgeButton, Theme],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ng-cartridges');
}
