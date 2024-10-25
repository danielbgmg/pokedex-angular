import { Routes } from '@angular/router';

const PagesRouting: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
];

export { PagesRouting };
