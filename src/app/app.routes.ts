import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then(m => m.HomeComponent)
  },
  {
    path: 'patreon/callback',
    loadComponent: () => import('./patreon-callback/patreon-callback').then(m => m.PatreonCallbackComponent)
  }
];
