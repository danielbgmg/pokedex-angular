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
            this.getListPokemonById(id).pipe(
              map(({ pokemon, descPokemon, id }) => {
                return {
                  ...pokemon,
                  //Usou Shorthand: id: id,
                  id,
                  description: descPokemon.flavor_text_entries[0].flavor_text,
                  evolutionChain: descPokemon.evolution_chain.url,
                };
              }),
            ),
          ),
        ),
      ),
      tap((pokes) => {
        this.pokemonsInfo = pokes;
      }),
    );
  }

  getPokemonById(id: string): Observable<IPokemonInfo> {
    return this.getListPokemonById(id).pipe(
      map(({ pokemon, descPokemon, id }) => {
        return {
          ...pokemon,
          //Usou Shorthand: id: id,
          id,
          description: descPokemon.flavor_text_entries[0].flavor_text,
          evolutionChain: descPokemon.evolution_chain.url,
        };
      }),
    );
  }

  // getFilterList(name: string): IPokemonInfo[] {
  //   console.log(this.pokemonsInfo)
  //   return this.pokemonsInfo.filter((pokemon) => pokemon.name.toLowerCase().includes(name));
  // }

  getFilterPokemonById(id: string): any {
    return this.pokemonsInfo.find((pokemon) => pokemon.id === id);
  }

  getFilterPokemonByName(name: string): any {
    // return this.pokemonsInfo.filter((pokemon) => pokemon.name == name )
    const pokemon = this.pokemonsInfo.find((pokemon) => pokemon.name == name);
    const pokeUrl = pokemon ? pokemon.sprites.other['official-artwork'].front_default : '';
    return pokeUrl;
  }

  getListPokemonById(id: string): Observable<any> {
    return forkJoin({
      id: of(id),
      pokemon: this._pokemonRest.getPokemon(id),
      descPokemon: this._pokemonRest.getSpeciePokemon(id),
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
