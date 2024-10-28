import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPokemonComponent } from './about-pokemon.component';

const routes: Routes = [
  {
    path: '',
    component: AboutPokemonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
