import {
  PokeType,
  PokeVariety,
  PokeFormType,
  PokeRegion,
  PokeGame,
} from '../../enums';
import { PokedexGenderDiffs } from './pokedex-gender-diffs.model';

export interface PokedexFormEntry {
  id: number;
  formType: PokeFormType;
  formName?: string;
  region?: PokeRegion;
  types: PokeType[];
  genderDiffs?: PokedexGenderDiffs;
  varieties?: PokeVariety[];
  movableTo: PokeGame[];
}
