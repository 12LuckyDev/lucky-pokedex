import { PokeVariantType, PokeGender } from 'src/app/enums';

export interface SpecyficSelection {
  formType: PokeVariantType | null;
  gender?: PokeGender;
  formId?: number;
}
