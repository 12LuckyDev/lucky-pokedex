import { PokeRegion } from '../enums';

export interface PokedexShowTypes {
  showGenders: boolean;
  showForms: boolean;
  showFormGenders: number[];
  showRegionalForms: boolean;
  showRegionalFormsGenders: PokeRegion[];
  showGigantamax: boolean;
  showGigantamaxGenders: boolean;
  showGigantamaxPerForm: boolean;
  showAlpha: boolean;
  showAlphaGenders: boolean;
  showAlphaForms: number[];
  showAlphaRegionalForms: PokeRegion[];
}
