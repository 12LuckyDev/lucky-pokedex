import { PokeRegion } from '../enums/poke-region.enum';
import { PokeType } from '../enums/poke-type.enum';
import { PokedexGenderDiffs } from './pokedex-gender-diffs.model';

export interface PokedexRegionalFormEntry {
  types: PokeType[];
  region: PokeRegion;
  genderDiffs?: PokedexGenderDiffs;
  alpha?: boolean;
}
