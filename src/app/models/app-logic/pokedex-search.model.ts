import { PokedexFilters } from './pokedex-filters.model';

export interface PokedexSearch {
  textSearch: string | null;
  filters: PokedexFilters;
}

export class PokemonSearchModel implements PokedexSearch {
  textSearch: string | null;
  filters: PokedexFilters;

  constructor() {
    this.textSearch = '';
    this.filters = {
      origins: [],
      obtainableIn: [],
      applyEvolutionToObtainableIn: true,
      applyFormsChangeToObtainableIn: true,
    };
  }
}
