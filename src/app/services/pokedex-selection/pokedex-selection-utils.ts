import { PokedexEntry, SpecyficSelection } from 'src/app/models';

export const getAllSelections = (
  entry: PokedexEntry,
  showTypes: {
    showGenders: boolean;
    showForms: boolean;
    showRegionalForms: boolean;
  }
): SpecyficSelection[] => {
  const specyficSelection: SpecyficSelection[] = [];
  const { showGenders, showForms, showRegionalForms } = showTypes;

  const { formsData, regionalForms, genders } = entry;

  if (showGenders) {
    specyficSelection.push(
      ...genders.map((g) => ({ baseForm: true, gender: g }))
    );
  } else {
    specyficSelection.push({ baseForm: true });
  }

  if (showForms) {
    formsData?.forms.forEach(({ id }) => {
      if (showGenders) {
        specyficSelection.push(
          ...genders.map((g) => ({
            baseForm: false,
            gender: g,
            formId: id,
          }))
        );
      } else {
        specyficSelection.push({ baseForm: false, formId: id });
      }
    });
  }

  if (showRegionalForms) {
    regionalForms?.forEach(({ region }) => {
      if (showGenders) {
        specyficSelection.push(
          ...genders.map((g) => ({
            baseForm: false,
            gender: g,
            regionalForm: region,
          }))
        );
      } else {
        specyficSelection.push({ baseForm: false, regionalForm: region });
      }
    });
  }

  return specyficSelection;
};
