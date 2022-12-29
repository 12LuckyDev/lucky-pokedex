import { PokeGender, PokeRarity, PokeRegion } from '../enums';
import { PokedexFormEntry } from './pokedex-form-entry.model';
import { FormsData } from './pokedex-forms-data.model';

export interface PokedexEntry {
  number: number;
  name: string;
  origin: PokeRegion;
  genders: PokeGender[];
  rarity: PokeRarity;
  formsData?: FormsData;
  forms: PokedexFormEntry[];
}
