import { PokedexFormEntry } from './pokedex-form-entry.model';

export interface FormsData {
  forms: PokedexFormEntry[];
  onlyVisual: boolean;
  interchandable: boolean;
  baseFormId?: number;
}
