import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () => import('./pages/dashboard-page.component')
  },
  {
    path: 'fleet',
    title: 'Fleet',
    loadComponent: () => import('./pages/fleet-page.component')
  },
  {
    path: 'reports',
    title: 'Reports',
    loadComponent: () => import('./pages/reports-page.component')
  },
  {
    path: 'settings',
    title: 'Settings',
    loadComponent: () => import('./pages/settings-page.component')
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
