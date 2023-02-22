import {
  PokeType,
  PokeVariety,
  PokeFormType,
  PokeRegion,
  PokeGame,
} from '../../enums';
import { EvolvesData } from './pokedex-evolves-data.model';
import { PokedexGenderDiffs } from './pokedex-gender-diffs.model';
import { ObtainableIn } from './pokedex-obtainable-in.model';

export interface PokedexFormEntry {
  id: number;
  formType: PokeFormType;
  formName?: string;
  region?: PokeRegion;
  types: PokeType[];
  genderDiffs?: PokedexGenderDiffs;
  varieties?: PokeVariety[];
  movableTo: PokeGame[];
  obtainableIn?: ObtainableIn[];
  evolvesIn?: EvolvesData[];
  evolvesFrom?: EvolvesData[];
}
