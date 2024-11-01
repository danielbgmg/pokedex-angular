import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { AboutPokemonComponent } from './about-pokemon.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [AboutPokemonComponent],
  imports: [CommonModule, AboutRoutingModule, NgOptimizedImage],
})
export class AboutPokemonModule {}
