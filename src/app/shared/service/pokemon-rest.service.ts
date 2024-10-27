import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPokemonResponse } from '../models/pokemon-response';
import { IPokemonInfo } from '../models/pokemons-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonRestService {
  private url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';
  // private url = 'https://pokeapi.co/api/v2/pokemon/1';

  constructor(private _http: HttpClient) {}

  getAll() {
    return this._http.get<IPokemonResponse>(this.url);
  }
  getPokemon(url: string): Observable<IPokemonInfo> {
    return this._http.get<IPokemonInfo>(url);
  }
}
