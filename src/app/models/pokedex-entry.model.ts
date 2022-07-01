import { PokeGender, PokeRarity, PokeRegion, PokeType } from '../enums';
import { FormsData } from './pokedex-forms-data.model';
import { PokedexGenderDiffs } from './pokedex-gender-diffs.model';
import { PokedexGigantamax } from './pokedex-gigantamax.model';
import { PokedexRegionalFormEntry } from './pokedex-regional-form-entry.model';

export interface PokedexEntry {
  number: number;
  name: string;
  types: PokeType[];
  origin: PokeRegion;
  genders: PokeGender[];
  genderDiffs?: PokedexGenderDiffs;
  regionalForms?: PokedexRegionalFormEntry[];
  formsData?: FormsData;
  gigantamax?: PokedexGigantamax;
  rarity: PokeRarity;
}
