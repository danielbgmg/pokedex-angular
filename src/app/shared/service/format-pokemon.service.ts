import { Injectable } from '@angular/core';
import { IPokemonInfo } from '../models/pokemons-info';

@Injectable({
  providedIn: 'root',
})
export class FormatPokemonService {
  constructor() {}

  formatPokemonInfo(pokemon: IPokemonInfo[]): IPokemonInfo[] {
    return pokemon.map((poke) => {
      //Com o método padStart eu não preciso usar essa lógica para formatar o id
      // let idFormat = poke.id;
      // while (idFormat.length < 3) {
      //   idFormat = '0' + idFormat;
      // }
      return {
        ...poke,
        // Preciso refatorar isso para não ter a duplicidade de informações
        // id: poke.id.padStart(3, '0'),
        idFormat: poke.id.padStart(3, '0'),
        name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1).toLowerCase(),
        description: poke.description?.replace(/[\n\f]/g, ''),
      };
    });
  }
}
