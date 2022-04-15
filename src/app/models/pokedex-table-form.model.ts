import { PokeFormType, PokeType } from '../enums';

export interface PokedexTableForm {
  id: number;
  formName: string;
  types: PokeType[];
  imgPath: string;
  formType: PokeFormType;
}
