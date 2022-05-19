import { PokeFormType, PokeType } from '../enums';
import { PokedexGenderDiffs } from './pokedex-gender-diffs.model';

export interface PokedexTableForm {
  id: number;
  formName: string;
  types: PokeType[];
  imgPath: string;
  formType: PokeFormType;
  genderDiffs?: PokedexGenderDiffs;
}
