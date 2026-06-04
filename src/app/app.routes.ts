import { Routes } from '@angular/router';
import { Modal } from './shared/components/modal/modal/modal';
import { CartridgeList } from './features/cartridges/components/cartridge-list/cartridge-list';
import { LocationList } from './features/locations/components/location-list/location-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cartridges',
    pathMatch: 'full',
  },
  {
    path: 'cartridges',
    component: CartridgeList,
    children: [
      {
        path: 'create',
        component: Modal,
        data: { mode: 'create' },
      },
      {
        path: 'edit/:id',
        component: Modal,
        data: { mode: 'edit' },
      },
    ],
  },
  {
    path: 'locations',
    // component: LocationList
    loadComponent: () =>
      import('./features/locations/components/location-list/location-list').then(
        (m) => m.LocationList
      ),
  }
];
