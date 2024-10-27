import { Component, Input } from '@angular/core';
import { IPokemonInfo } from '../models/pokemons-info';

@Component({
  selector: 'app-card-poke-simple',
  templateUrl: './card-poke-simple.component.html',
  styleUrl: './card-poke-simple.component.scss',
})
export class CardPokeSimpleComponent {
  @Input() pokemonName?: string;
  @Input() pokemonTypes?: { type: { name: string } }[];
}
