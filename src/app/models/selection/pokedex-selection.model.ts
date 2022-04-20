import { PokeGender, PokeRegion } from 'src/app/enums';
import { FormGenderSelection } from './form-gender-selection.model';

export interface PokedexSelection {
  selected: boolean;
  genders: PokeGender[] | null;
  regionalForms: PokeRegion[] | null;
  regionalFormsGenders: FormGenderSelection[] | null;
  forms: number[] | null;
  formsGenders: FormGenderSelection[] | null;
}

export class PokedexSelectionModel implements PokedexSelection {
  selected: boolean;
  genders: PokeGender[] | null;
  regionalForms: PokeRegion[] | null;
  regionalFormsGenders: FormGenderSelection[] | null;
  forms: number[] | null;
  formsGenders: FormGenderSelection[] | null;

  constructor() {
    this.selected = false;
    this.genders = [];
    this.regionalForms = null;
    this.regionalFormsGenders = null;
    this.forms = null;
    this.formsGenders = null;
  }
}
