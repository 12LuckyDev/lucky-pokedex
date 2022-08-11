import { PokeFormType, PokeGender } from 'src/app/enums';
import {
  PokedexTableEntry,
  PokedexShowTypes,
  SpecyficSelection,
} from 'src/app/models';
import { getTableFormsList } from './get-table-forms-list-utils';

const buildSelection = (
  formType: PokeFormType | null,
  opt: { gender?: PokeGender; formId?: number } = {}
): SpecyficSelection => {
  return { formType, ...opt };
};

const buildGendersSelections = (
  formType: PokeFormType | null,
  genders: PokeGender[],
  formId?: number
): SpecyficSelection[] =>
  genders.map((gender) => buildSelection(formType, { gender, formId }));

export const getAllSelections = (
  entry: PokedexTableEntry,
  showTypes: PokedexShowTypes
): SpecyficSelection[] => {
  const allSelection: SpecyficSelection[] = [];
  const allForms = getTableFormsList(entry, showTypes);
  const { showForms } = showTypes;
  const { genders } = entry;

  if (!showForms) {
    if (entry.showGender) {
      allSelection.push(...buildGendersSelections(null, genders));
    } else {
      allSelection.push(buildSelection(null));
    }
  }

  allForms.forEach(({ showGender, id, formType }) => {
    if (showGender) {
      allSelection.push(...buildGendersSelections(formType, genders, id));
    } else {
      allSelection.push(buildSelection(formType, { formId: id }));
    }
  });

  return allSelection;
};
