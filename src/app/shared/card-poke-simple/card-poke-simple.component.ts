import { Component, Input } from '@angular/core';
import { IPokemonInfo } from '../models/pokemons-info';

@Component({
  selector: 'app-card-poke-simple',
  templateUrl: './card-poke-simple.component.html',
  styleUrl: './card-poke-simple.component.scss',
})
export class CardPokeSimpleComponent {
  @Input() pokemonId?: string;
  @Input() pokemonIdFormat?: string;
  @Input() pokemonName?: string;
  @Input() pokemonImage?: string;
  @Input() pokemonTypes?: { type: { name: string } }[];
  @Input() pokemonDesc?: string;
}
