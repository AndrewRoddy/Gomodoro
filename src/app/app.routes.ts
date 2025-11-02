import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./app').then(m => m.App)
  },
  {
    path: 'patreon/callback',
    loadComponent: () => import('./patreon-callback/patreon-callback').then(m => m.PatreonCallbackComponent)
  }
];
