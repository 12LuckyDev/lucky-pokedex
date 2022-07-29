import { PokeType } from '../enums/poke-type.enum';

export interface PokedexFormEntry {
  id: number;
  formName: string;
  types: PokeType[];
  alpha?: boolean;
}
