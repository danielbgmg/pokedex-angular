import { Component, OnInit } from '@angular/core';
import { PokemonRestService } from './../service/pokemon-rest.service';
import { IPokemonResult } from '../models/pokemon-results';
import { IPokemonInfo } from '../models/pokemons-info';
import { forkJoin, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.scss',
})
export class ListPokemonComponent implements OnInit {
  pokemonsInfo: IPokemonInfo[] = [];

  constructor(private _pokemonRest: PokemonRestService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this._pokemonRest
      .getAll()
      .pipe(switchMap((resp) => forkJoin(resp.results.map((pokemon) => this._pokemonRest.getPokemon(pokemon.url)))))
      .subscribe((resp: IPokemonInfo[]) => {
        this.pokemonsInfo = this.capitalizeName(resp);
        console.log(this.pokemonsInfo[0].types);
      });
  }
  capitalizeName(pokemons: IPokemonInfo[]): IPokemonInfo[] {
    return pokemons.map((pokemon) => ({
      ...pokemon,
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase(),
    }));
  }
}
