import { Routes } from '@angular/router';

const PagesRouting: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./about-pokemon/about-pokemon.module').then((m) => m.AboutPokemonModule),
  },
];

export { PagesRouting };
