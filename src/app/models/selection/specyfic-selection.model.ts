import { PokeFormType, PokeGender } from 'src/app/enums';

export interface SpecyficSelection {
  formType: PokeFormType | null;
  gender?: PokeGender;
  formId?: number;
}
