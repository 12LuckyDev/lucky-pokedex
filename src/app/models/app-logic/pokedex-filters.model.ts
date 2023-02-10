import { PokeGame, PokeRegion } from 'src/app/enums';

export interface PokedexFilters {
  origins: PokeRegion[];
  obtainableIn: PokeGame[];
}
