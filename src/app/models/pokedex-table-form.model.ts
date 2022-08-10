import { PokeFormType, PokeType } from '../enums';
import { PokedexGenderDiffs } from './pokedex-gender-diffs.model';

export interface PokedexTableForm {
  id: number;
  formName: string;
  types: PokeType[];
  formType: PokeFormType;
  genderDiffs?: PokedexGenderDiffs;
  showGender: boolean;
}
