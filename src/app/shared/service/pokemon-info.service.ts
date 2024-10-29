import { Injectable } from '@angular/core';
import { PokemonRestService } from './pokemon-rest.service';
import { IPokemonInfo } from '../models/pokemons-info';
import { IPokemonInfoDesc } from '../models/pokemon-info-desc';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonInfoService {
  constructor(private _pokemonRest: PokemonRestService) {}
  pokemonsInfo: IPokemonInfo[] = [];
  pokemonInfoDesc: IPokemonInfoDesc[] = [];

  loadAll(): Observable<IPokemonInfo[]> {
    return this._pokemonRest.getAll().pipe(
      map((resp) => resp.results.map((urls) => this.getId(urls.url))),
      switchMap((ids) =>
        forkJoin(
          ids.map((id) =>
            this.getPokemonById(id).pipe(
              map(({ pokemon, descPokemon, id }) => {
                return {
                  ...pokemon,
                  //Usou Shorthand: id: id,
                  id,
                  description: descPokemon.flavor_text_entries[0].flavor_text,
                };
              }),
            ),
          ),
        ),
      ),
    );
  }

  getPokemonById(id: string): Observable<any> {
    return forkJoin({
      id: of(id),
      pokemon: this._pokemonRest.getPokemon(id),
      descPokemon: this._pokemonRest.getDescPokemon(id),
    });
  }

  formatPokemonInfo(pokemon: IPokemonInfo): IPokemonInfo {
    let idFormat = pokemon.id;
    while (idFormat.length < 3) {
      idFormat = '0' + idFormat;
    }
    return {
      ...pokemon,
      id: idFormat,
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase(),
      description: pokemon.description?.replace(/[\n\f]/g, ''),
    };
  }
  getId(url: string): string {
    const id = url.replace(/\/$/, '').split('/').pop();
    return id!;
  }
}
