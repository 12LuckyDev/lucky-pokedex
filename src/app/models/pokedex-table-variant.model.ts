import { PokeVariantType, PokeType } from '../enums';
import { PokedexGenderDiffs } from './pokedex-gender-diffs.model';

export interface PokedexTableVariant {
  id: number;
  formName: string;
  types: PokeType[];
  formType: PokeVariantType;
  genderDiffs?: PokedexGenderDiffs;
  showGender: boolean;
}
