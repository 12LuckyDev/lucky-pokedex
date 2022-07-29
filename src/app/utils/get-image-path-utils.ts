import { PokeFormType, PokeGender } from '../enums';
import { PokedexEntry, PokedexTableForm } from '../models';

export const getImagePath = (
  entry?: PokedexEntry,
  opt: { gender?: PokeGender; form?: PokedexTableForm } = {}
): string => {
  if (!entry) {
    return '';
  }

  const { gender, form } = opt;
  const { number, formsData, gigantamax } = entry;

  let path = number.toString();

  let addFemaleTag = true;

  if (form) {
    const { formType, id } = form;
    switch (formType) {
      case PokeFormType.form:
      case PokeFormType.form_alpha:
        path += `_${id}`;
        break;
      case PokeFormType.regional_form:
      case PokeFormType.regional_form_alpha:
        path += `_rf${id}`;
        break;
      case PokeFormType.gigantamax:
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
    !!(form ? form?.genderDiffs : entry?.genderDiffs)
  ) {
    path += '_f';
  }

  return path + '.png';
};
