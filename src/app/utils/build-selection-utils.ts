import { PokeGender } from '../enums';
import { PokedexTableVariant, SpecyficSelection } from '../models';

export const buildSelection = (
  variant: PokedexTableVariant,
  gender?: PokeGender
): SpecyficSelection => {
  const { formType, id, variety } = variant;
  const selection: SpecyficSelection = { formType, id };

  if (typeof variety === 'number') {
    selection.variety = variety;
  }

  if (typeof gender === 'number') {
    selection.gender = gender;
  }

  return selection;
};
