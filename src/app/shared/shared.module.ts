import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { CardPokeSimpleComponent } from './card-poke-simple/card-poke-simple.component';
import { CardPokeFullComponent } from './card-poke-full/card-poke-full.component';

@NgModule({
  declarations: [ListPokemonComponent, CardPokeSimpleComponent, CardPokeFullComponent],
  imports: [CommonModule, NgOptimizedImage],
  exports: [ListPokemonComponent],
})
export class SharedModule {}
