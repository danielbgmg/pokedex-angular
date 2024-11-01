import { Injectable } from '@angular/core';
import { PokemonRestService } from './pokemon-rest.service';
import { IPokemonEvolution, IPokemonEvolutionRequest } from '../models/pokemon-evolution';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonEvolutionService {
  constructor(private _pokemonRest: PokemonRestService) {}

  getPokemonEvolution(id: string): Observable<IPokemonEvolutionRequest> {
    return this._pokemonRest.getEvolution(id);
  }
}
