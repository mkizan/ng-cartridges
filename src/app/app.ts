import { Component, signal } from '@angular/core';
import { Dashboard } from './dashboard/dashboard';
import { CartridgesList } from './cartridges-list/cartridges-list';

@Component({
  selector: 'app-root',
  imports: [Dashboard, CartridgesList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ng-cartridges');
}
