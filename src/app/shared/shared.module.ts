import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { CardPokeSimpleComponent } from './card-poke-simple/card-poke-simple.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListPokemonComponent, CardPokeSimpleComponent],
  imports: [CommonModule, NgOptimizedImage, RouterModule],
  exports: [ListPokemonComponent],
})
export class SharedModule {}
