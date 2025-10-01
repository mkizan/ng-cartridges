import { Component, signal } from '@angular/core';
import { CounterCartridges } from './features/cartridge-dashboard/components/counter-cartridges/counter-cartridges';
import { CartridgeList } from './features/cartridges/components/cartridge-list/cartridge-list';

@Component({
  selector: 'app-root',
  imports: [CounterCartridges, CartridgeList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ng-cartridges');
}
