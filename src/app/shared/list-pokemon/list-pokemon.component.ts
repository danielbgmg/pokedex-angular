import { Component, OnInit } from '@angular/core';
import { PokemonRestService } from './../service/pokemon-rest.service';
import { IPokemonInfo } from '../models/pokemons-info';
import { forkJoin, map, of, switchMap, tap } from 'rxjs';
import { IPokemonInfoDesc } from '../models/pokemon-info-desc';
import { PokemonInfoService } from '../service/pokemon-info.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.scss',
})
export class ListPokemonComponent implements OnInit {
  pokemonsInfo: IPokemonInfo[] = [];

  constructor(private _pokemonRest: PokemonInfoService) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  getPokemon() {
    this._pokemonRest.loadAll().subscribe({
      next: (pokemon) => {
        console.log(pokemon[0].sprites.other['official-artwork'].front_default);
        this.pokemonsInfo = this.formatPokemonInfo(pokemon);
      },
    });
  }

  formatPokemonInfo(pokemon: IPokemonInfo[]): IPokemonInfo[] {
    return pokemon.map((poke) => {
      let idFormat = poke.id;
      while (idFormat.length < 3) {
        idFormat = '0' + idFormat;
      }
      return {
        ...poke,
        id: idFormat,
        name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1).toLowerCase(),
        description: poke.description?.replace(/[\n\f]/g, ''),
      };
    });
  }
}
