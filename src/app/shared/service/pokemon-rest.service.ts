import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemonResponse } from '../models/pokemon-response';
import { IPokemonInfo } from '../models/pokemons-info';
import { Observable } from 'rxjs';
import { IPokemonInfoDesc } from '../models/pokemon-info-desc';
import { IPokemonEvolutionRequest } from '../models/pokemon-evolution';

@Injectable({
  providedIn: 'root',
})
export class PokemonRestService {
  private url = 'https://pokeapi.co/api/v2/pokemon?limit=6&offset=0';
  private urlPokemon = 'https://pokeapi.co/api/v2/pokemon/';
  private urlDescPokemon = 'https://pokeapi.co/api/v2/pokemon-species/';

  constructor(private _http: HttpClient) {}

  getAll() {
    return this._http.get<IPokemonResponse>(this.url);
  }
  getPokemon(idOrName: string | number): Observable<IPokemonInfo> {
    return this._http.get<IPokemonInfo>(this.urlPokemon + idOrName);
  }
  getSpeciePokemon(id: string): Observable<IPokemonInfoDesc> {
    return this._http.get<IPokemonInfoDesc>(this.urlDescPokemon + id);
  }
  getEvolution(url: string): Observable<IPokemonEvolutionRequest> {
    return this._http.get<IPokemonEvolutionRequest>(url);
  }
}
