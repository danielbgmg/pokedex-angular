import { IPokemonResult } from './pokemon-results';

export interface IPokemonResponse {
  count: number;
  next: string;
  previus: any;
  results: IPokemonResult[];
}
