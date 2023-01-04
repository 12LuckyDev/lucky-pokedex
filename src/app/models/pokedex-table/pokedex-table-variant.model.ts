import { PokeType, PokeVariety, PokeFormType, PokeRegion } from '../../enums';
import { PokedexGenderDiffs } from '../pokedex-data/pokedex-gender-diffs.model';

export interface PokedexTableVariant {
  id: number;
  formType: PokeFormType;
  formName: string;
  region?: PokeRegion;
  types: PokeType[];
  genderDiffs?: PokedexGenderDiffs;
  variety?: PokeVariety;
  showGender: boolean;
}
