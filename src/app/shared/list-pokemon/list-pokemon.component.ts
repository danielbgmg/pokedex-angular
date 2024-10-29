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
  pokemonsInfo: IPokemonInfo[] = [];

  constructor(
    private _pokemonRest: PokemonInfoService,
    private _formatPokemon: FormatPokemonService,
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
    this._pokemonRest.loadAll().subscribe({
      next: (pokemon) => {
        this.pokemonsInfo = this._formatPokemon.formatPokemonInfo(pokemon);
      },
    });
  }
}
