import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonInfoService } from '../../shared/service/pokemon-info.service';
import { IPokemonInfo } from '../../shared/models/pokemons-info';
import { map, Observable, tap, of } from 'rxjs';
import { FormatPokemonService } from '../../shared/service/format-pokemon.service';

@Component({
  selector: 'app-about-pokemon',
  templateUrl: './about-pokemon.component.html',
  styleUrl: './about-pokemon.component.scss',
})
export class AboutPokemonComponent implements OnInit {
  @Input() pokemonId?: string;
  @Input() pokemonIdFormat?: string;
  @Input() pokemonName?: string;
  @Input() pokemonImage?: string;
  @Input() pokemonTypes?: { type: { name: string } }[];
  @Input() pokemonDesc?: string;

  id: string = '';
  pokemonInfo: Partial<IPokemonInfo> = {};

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _pokemonRest: PokemonInfoService,
    private _formatPokemon: FormatPokemonService,
  ) {}

  ngOnInit(): void {
    this.getId();
    this.getPokeInfo();
  }

  getPokeInfo() {
    this._pokemonRest
      .getPokemonById(this.id)
      .pipe(
        map(({ pokemon, descPokemon }) => {
          return {
            ...pokemon,
            description: descPokemon.flavor_text_entries[0]?.flavor_text,
          };
        }),
      )
      .subscribe({
        next: (pokemon: IPokemonInfo) => {
          this.pokemonInfo = this.formatPokemonInfo(pokemon);
          this.pokemonName = this.pokemonInfo.name;
        },
      });
  }

  formatPokemonInfo(pokemon: IPokemonInfo): IPokemonInfo {
    let idFormat = pokemon.id;
    while (idFormat.length < 3) {
      idFormat = '0' + idFormat;
    }
    return {
      ...pokemon,
      idFormat: idFormat,
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase(),
      description: pokemon.description?.replace(/[\n\f]/g, ''),
    };
  }

  getId() {
    return (this.id = this._activatedRoute.snapshot.paramMap.get('id') ?? '');
  }
}
