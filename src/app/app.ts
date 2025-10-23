import { Component, signal } from '@angular/core';
import { CounterCartridges } from './features/cartridge-dashboard/components/counter-cartridges/counter-cartridges';
import { CartridgeList } from './features/cartridges/components/cartridge-list/cartridge-list';
import { AddCartridge } from './features/cartridges/components/add-cartirdge/add-cartridge';
import { Theme } from './core/components/theme/theme';

@Component({
  selector: 'app-root',
  imports: [CounterCartridges, CartridgeList, AddCartridge, Theme],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ng-cartridges');
}
