import { Component, OnInit } from '@angular/core';
import { PokemonRestService } from './../service/pokemon-rest.service';
import { IPokemonInfo } from '../models/pokemons-info';
import { forkJoin, map, of, switchMap, tap } from 'rxjs';
import { IPokemonInfoDesc } from '../models/pokemon-info-desc';
import { PokemonInfoService } from '../service/pokemon-info.service';
import { FormatPokemonService } from '../service/format-pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.scss',
})
export class ListPokemonComponent implements OnInit {
  pokemonsListAll: IPokemonInfo[] = [];
  pokemonListFilter: IPokemonInfo[] = [];
  constructor(
    private _pokemonInfoRest: PokemonInfoService,
    private _formatPokemon: FormatPokemonService,
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
    this._pokemonInfoRest.loadAll().subscribe({
      next: (pokemon) => {
        this.pokemonsListAll = this._formatPokemon.formatPokemonInfo(pokemon);
        this.pokemonListFilter = this.pokemonsListAll;
      },
    });
  }

  getFilterPokemon(value: string) {
    this.pokemonListFilter = this.pokemonsListAll.filter((poke) => poke.name.toLowerCase().includes(value.toLowerCase()));
  }
}
