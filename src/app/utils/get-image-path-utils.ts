import { PokeGender, PokeFormType, PokeVariety } from '../enums';
import { PokedexEntry, PokedexTableVariant } from '../models';

export const getImagePath = (
  entry: PokedexEntry,
  variant: PokedexTableVariant,
  gender?: PokeGender
): string => {
  const { number, formsData } = entry;
  let path = number.toString();

  let addFemaleTag = true;
  const addGigantamaxTag = variant.variety === PokeVariety.gigantamax;

  const { formType, id, region } = variant;
  switch (formType) {
    case PokeFormType.form:
      if (!addGigantamaxTag || formsData?.gigantamaxFormDiffs) {
        path += `_${id}`;
      }
      break;
    case PokeFormType.regional_form:
      path += `_rf${region}`;
      break;
  }

  if (addGigantamaxTag) {
    addFemaleTag = false;
    path += '_g';
  }

  if (addFemaleTag && gender === PokeGender.female && !!variant.genderDiffs) {
    path += '_f';
  }

  return path + '.png';
};
