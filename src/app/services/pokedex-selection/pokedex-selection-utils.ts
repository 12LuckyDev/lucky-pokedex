import { add, editPropAt, isArray, removeAt, toggle } from '@12luckydev/utils';
import { PokeGender } from 'src/app/enums';
import {
  FormGenderSelection,
  PokedexFormEntry,
  PokedexRegionalFormEntry,
} from 'src/app/models';

export const compareGenders = (
  genders: PokeGender[],
  selectedGenders?: PokeGender[] | null
): boolean => {
  return selectedGenders ? selectedGenders.length === genders.length : false;
};

export const handleFormGenderChange = (
  formsGenders: FormGenderSelection[] | null,
  formId: number,
  gender: number
): FormGenderSelection[] => {
  const newFormsGenders = formsGenders ?? [];
  const index = newFormsGenders.findIndex(({ id }) => id === formId);
  const genders: PokeGender[] =
    index > -1 ? toggle(newFormsGenders[index].genders, gender) : [gender];

  return genders.length > 0
    ? index > -1
      ? editPropAt(newFormsGenders, 'genders', genders, index)
      : add(newFormsGenders, { id: formId, genders })
    : removeAt(newFormsGenders, index);
};

export const checkIsFormGenderSelected = (
  formsGenders: FormGenderSelection[] | null,
  formId: number,
  gender: number
): boolean => {
  const formGenders = formsGenders?.find(({ id }) => id === formId) ?? null;
  return !!formGenders?.genders?.includes(gender);
};

export const checkIsAllFormsSelected = (
  showGenders: boolean,
  genders: PokeGender[],
  selectedForms: number[] | null,
  formsGenders: FormGenderSelection[] | null,
  forms: PokedexFormEntry[] | PokedexRegionalFormEntry[] | undefined
) => {
  if (showGenders) {
    if (forms?.length === formsGenders?.length) {
      if (
        formsGenders?.some(
          ({ genders: formGenders }) => !compareGenders(genders, formGenders)
        )
      ) {
        return false;
      }
    } else {
      return false;
    }
  } else if (!!forms && forms.length !== selectedForms?.length) {
    return false;
  }
  return true;
};

export const checkIsSomeFormsSelected = (
  showGenders: boolean,
  forms: number[] | null,
  formsGenders: FormGenderSelection[] | null
) => {
  if (showGenders) {
    if (
      formsGenders?.some(({ genders: formGenders }) =>
        isArray(formGenders, false)
      )
    ) {
      return true;
    }
  } else if (isArray(forms, false)) {
    return true;
  }
  return false;
};
