import { PokeGender } from 'src/app/enums';
import { buildSelection } from './build-selection-utils';
import {
  PokedexTableEntry,
  SpecyficSelection,
  PokedexTableVariant,
} from 'src/app/models';

const buildGendersSelections = (
  variant: PokedexTableVariant,
  genders: PokeGender[]
): SpecyficSelection[] =>
  genders.map((gender) => buildSelection(variant, gender));

export const getAllSelections = (
  entry: PokedexTableEntry
): SpecyficSelection[] => {
  const allSelection: SpecyficSelection[] = [];
  const { genders, variants } = entry;

  variants.forEach((variant) => {
    if (variant.showGender) {
      allSelection.push(...buildGendersSelections(variant, genders));
    } else {
      allSelection.push(buildSelection(variant));
    }
  });

  return allSelection;
};
