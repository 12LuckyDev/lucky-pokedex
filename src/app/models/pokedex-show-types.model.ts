import { PokeRegion } from '../enums';

export interface PokedexShowTypes {
  showGenders: boolean;
  showForms: boolean;
  showRegionalForms: boolean;
  showGigantamax: boolean;
  showGigantamaxPerForm: boolean;
  showAlpha: boolean;
  showAlphaForms: number[];
  showAlphaRegionalForms: PokeRegion[];
}
