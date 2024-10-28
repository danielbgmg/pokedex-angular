import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutPokemonComponent } from './about-pokemon.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [AboutPokemonComponent],
  imports: [CommonModule, AboutRoutingModule],
})
export class AboutPokemonModule {}
