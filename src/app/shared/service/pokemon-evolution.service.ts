import { Injectable } from '@angular/core';
import { PokemonRestService } from './pokemon-rest.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonEvolutionService {
  constructor(private _pokemonRest: PokemonRestService) {}

  getPokemonEvolution(id: string) {
    this._pokemonRest.getEvolution(id).subscribe((poke) => console.log(poke));
  }
}
