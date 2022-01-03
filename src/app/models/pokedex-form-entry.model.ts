import { PokeType } from '../enums/poke-type.enum';

export interface PokedexFormEntry {
  formName: string;
  types: PokeType[];
  imgPath: string;
}
