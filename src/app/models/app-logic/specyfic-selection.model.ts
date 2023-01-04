import { PokeGender, PokeFormType, PokeVariety } from 'src/app/enums';

export interface SpecyficSelection {
  formType: PokeFormType;
  id: number;
  gender?: PokeGender;
  variety?: PokeVariety;
}
