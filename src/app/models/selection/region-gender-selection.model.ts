import { PokeGender, PokeRegion } from 'src/app/enums';

export interface RegionGenderSelection {
  region: PokeRegion;
  genders: PokeGender[];
}
