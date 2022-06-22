import { PokeGender, PokeRegion } from 'src/app/enums';

export interface SpecyficSelection {
  baseForm: boolean;
  gender?: PokeGender;
  formId?: number;
  regionalForm?: PokeRegion;
}
