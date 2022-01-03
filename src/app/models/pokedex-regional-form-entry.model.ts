import { PokeRegion } from '../enums/poke-region.enum';
import { PokeType } from '../enums/poke-type.enum';

export interface PokedexRegionalFormEntry {
  types: PokeType[];
  region: PokeRegion;
  imgPath: string;
}
