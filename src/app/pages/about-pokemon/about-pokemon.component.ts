import { Component, input, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonInfoService } from '../../shared/service/pokemon-info.service';
import { IPokemonInfo } from '../../shared/models/pokemons-info';
import { map, Observable, tap, of, first, forkJoin } from 'rxjs';
import { FormatPokemonService } from '../../shared/service/format-pokemon.service';
import { IPokemonStats } from '../../shared/models/pokemon-stats';
import { IPokemonAbility } from '../../shared/models/pokemon-ability';
import { PokemonRestService } from '../../shared/service/pokemon-rest.service';
import { PokemonEvolutionService } from '../../shared/service/pokemon-evolution.service';
import { IPokemonEvolution, IPokemonEvolutionRequest } from '../../shared/models/pokemon-evolution';

@Component({
  selector: 'app-about-pokemon',
  templateUrl: './about-pokemon.component.html',
  styleUrl: './about-pokemon.component.scss',
})
export class AboutPokemonComponent implements OnInit {
  @Input() pokemonIdFormat?: string;
  @Input() pokemonName?: string;
  @Input() pokemonImage?: string;
  @Input() pokemonTypes?: { type: { name: string } }[];
  @Input() pokemonDesc?: string;
  @Input() pokemonStats: IPokemonStats = { stats: [] };
  @Input() pokemonAbilites?: IPokemonAbility[];
  @Input() pokemonEvolutionsName!: IPokemonEvolution;

  id: string = '';
  pokemonInfo!: Required<IPokemonInfo>;
  urlEvolution!: string;
  // pokemonEvolutionsName!: IPokemonEvolution

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _pokemonInfoRest: PokemonInfoService,
    private _pokemonEvolution: PokemonEvolutionService,
    private _pokemonRest: PokemonRestService,
  ) {}

  ngOnInit(): void {
    this.getId();
    this.getPokeInfo();
    this.getEvolutionName();
  }

  getPokeInfo() {
    this.pokemonInfo = this._pokemonInfoRest.getFilterPokemonById(this.id);

    if (this.pokemonInfo == undefined) {
      this._pokemonInfoRest.getPokemonById(this.id).subscribe((poke) => {
        this.pokemonInfo = poke;
        this.processPokemonInfo();
      });
    } else {
      this.processPokemonInfo();
    }
  }

  processPokemonInfo() {
    this.pokemonInfo = this.formatPokemonInfo(this.pokemonInfo);
    this.pokemonImage = this.pokemonInfo.sprites?.other['official-artwork'].front_default;
    this.pokemonIdFormat = this.pokemonInfo.idFormat;
    this.pokemonName = this.pokemonInfo.name;
    this.pokemonDesc = this.pokemonInfo.description;
    this.pokemonTypes = this.pokemonInfo.types;
    this.pokemonStats = this.formatPokemonStats(this.pokemonInfo);
    this.pokemonAbilites = this.formatAbilitiesName(this.pokemonInfo);
    this.urlEvolution = this.pokemonInfo.evolutionChain;
    console.log(this.urlEvolution);
  }

  getEvolutionName() {
    this._pokemonEvolution.getPokemonEvolution(this.urlEvolution).subscribe({
      next: (poke) => {
        this.formatPokemonEvolution(poke).subscribe((evolutionName) => {
          this.pokemonEvolutionsName = evolutionName;
        });
      },
    });
  }

  formatPokemonEvolution(pokemon: IPokemonEvolutionRequest): Observable<IPokemonEvolution> {
    const listNamePokemonsEvolution = [
      pokemon.chain.species.name,
      pokemon.chain.evolves_to[0].species.name,
      pokemon.chain.evolves_to[0].evolves_to[0].species.name,
    ];
    const request = listNamePokemonsEvolution.map((poke) => this._pokemonRest.getPokemon(poke));

    return forkJoin(request).pipe(
      map((pokemon) => {
        const listPokemonUrlSprit = pokemon.map((poke) => poke.sprites.other['official-artwork'].front_default);
        return {
          firstStage: listPokemonUrlSprit[0],
          secondStage: listPokemonUrlSprit[1],
          thirdStage: listPokemonUrlSprit[2],
        };
      }),
    );
  }

  formatPokemonInfo(pokemon: IPokemonInfo): IPokemonInfo {
    return {
      ...pokemon,
      idFormat: String(pokemon.id).padStart(3, '0'),
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1).toLowerCase(),
      description: pokemon.description?.replace(/[\n\f]/g, ' '),
    };
  }

  formatAbilitiesName(pokemon: IPokemonInfo) {
    return pokemon.abilities.map((ability) => ({
      ...ability,
      ability: {
        ...ability.ability,
        name: ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1).toLowerCase(),
      },
    }));
  }

  formatPokemonStats(pokemon: IPokemonInfo): IPokemonStats {
    const statMapping: { [key: string]: string } = {
      hp: 'HP',
      attack: 'ATK',
      defense: 'DEF',
      'special-attack': 'SpA',
      'special-defense': 'SpD',
      speed: 'SPD',
    };

    return {
      stats:
        pokemon.stats.map((pokeStat) => ({
          name: statMapping[pokeStat.stat.name] || pokeStat.stat.name,
          value: pokeStat.base_stat,
        })) || [],
    };
  }

  getId() {
    return (this.id = this._activatedRoute.snapshot.paramMap.get('id') ?? '');
  }
}
