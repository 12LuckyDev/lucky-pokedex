import { PokeVariantType, PokeGender } from '../enums';
import { PokedexEntry, PokedexTableVariant } from '../models';

export const getImagePath = (
  entry?: PokedexEntry,
  opt: { gender?: PokeGender; variant?: PokedexTableVariant } = {}
): string => {
  if (!entry) {
    return '';
  }

  const { gender, variant } = opt;
  const { number, formsData, gigantamax } = entry;

  let path = number.toString();

  let addFemaleTag = true;

  if (variant) {
    const { formType, id } = variant;
    switch (formType) {
      case PokeVariantType.form:
      case PokeVariantType.form_alpha:
        path += `_${id}`;
        break;
      case PokeVariantType.regional_form:
      case PokeVariantType.regional_form_alpha:
        path += `_rf${id}`;
        break;
      case PokeVariantType.gigantamax:
        path += !!gigantamax?.formDiffs ? `_${id}_g` : '_g';
        addFemaleTag = false;
        break;
    }
  } else if (formsData) {
    const { baseFormId, forms } = formsData;
    path += `_${baseFormId ?? forms[0].id}`;
  }

  if (
    addFemaleTag &&
    gender === PokeGender.female &&
    !!(variant ? variant?.genderDiffs : entry?.genderDiffs)
  ) {
    path += '_f';
  }

  return path + '.png';
};
