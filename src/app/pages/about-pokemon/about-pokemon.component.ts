import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about-pokemon',
  templateUrl: './about-pokemon.component.html',
  styleUrl: './about-pokemon.component.scss',
})
export class AboutPokemonComponent {
  @Input() pokemonId?: string;
  @Input() pokemonName?: string;
  @Input() pokemonImage?: string;
  @Input() pokemonTypes?: { type: { name: string } }[];
  @Input() pokemonDesc?: string;
}
