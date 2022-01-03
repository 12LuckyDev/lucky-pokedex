import { PokeGender, PokeRarity, PokeRegion, PokeType } from '../enums';
import { PokedexFormEntry } from './pokedex-form-entry.model';
import { PokedexGenderDiffs } from './pokedex-gender-diffs.model';
import { PokedexRegionalFormEntry } from './pokedex-regional-form-entry.model';

export interface PokedexEntry {
  number: number;
  name: string;
  types: PokeType[];
  origin: PokeRegion;
  genders: PokeGender[];
  genderDiffs?: PokedexGenderDiffs;
  regionalForms?: PokedexRegionalFormEntry[];
  forms?: PokedexFormEntry[];
  formDiffsOnlyVisual?: boolean;
  rarity: PokeRarity;
}
