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
  const { number, formsData } = entry;

  let path = number.toString();

  if (form) {
    const { formType, id } = form;
    switch (formType) {
      case PokeFormType.form:
        path += `_${id}`;
        break;
      case PokeFormType.regional_form:
        path += `_rf${id}`;
        break;
    }
  } else if (formsData) {
    const { baseFormId, forms } = formsData;
    path += `_${baseFormId ?? forms[0].id}`;
  }

  if (
    gender === PokeGender.female &&
    !!(form ? form?.genderDiffs : entry?.genderDiffs)
  ) {
    path += '_f';
  }

  return path + '.png';
};
