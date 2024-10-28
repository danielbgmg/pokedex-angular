import { Component, OnInit } from '@angular/core';
import { PokemonRestService } from './../service/pokemon-rest.service';
import { IPokemonResult } from '../models/pokemon-results';
import { IPokemonInfo } from '../models/pokemons-info';
import { forkJoin, map, of, switchMap, tap } from 'rxjs';
import { IPokemonInfoDesc } from '../models/pokemon-info-desc';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.scss',
})
export class ListPokemonComponent implements OnInit {
  pokemonsInfo: IPokemonInfo[] = [];
  pokemonInfoDesc: IPokemonInfoDesc[] = [];

  constructor(private _pokemonRest: PokemonRestService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this._pokemonRest
      .getAll()
      .pipe(
        map((resp) => resp.results.map((urls) => this.getId(urls.url))),
        switchMap((ids) =>
          forkJoin(
            ids.map((id) =>
              forkJoin({
                id: of(id),
                pokemon: this._pokemonRest.getPokemon(id),
                descPokemon: this._pokemonRest.getDescPokemon(id),
              }).pipe(
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
      )
      .subscribe((resp) => {
        this.pokemonsInfo = resp.map((resp) => this.formatPokemonInfo(resp));
        console.log(this.pokemonsInfo[0].id);
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
