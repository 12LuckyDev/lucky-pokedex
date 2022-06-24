import { PokeFormType } from 'src/app/enums';
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
      ...genders.map((g) => ({ formType: null, gender: g }))
    );
  } else {
    specyficSelection.push({ formType: null });
  }

  if (showForms) {
    formsData?.forms.forEach(({ id }) => {
      if (showGenders) {
        specyficSelection.push(
          ...genders.map(
            (g) =>
              ({
                formType: PokeFormType.form,
                gender: g,
                formId: id,
              } as SpecyficSelection)
          )
        );
      } else {
        specyficSelection.push({ formType: PokeFormType.form, formId: id });
      }
    });
  }

  if (showRegionalForms) {
    regionalForms?.forEach(({ region }) => {
      if (showGenders) {
        specyficSelection.push(
          ...genders.map(
            (g) =>
              ({
                formType: PokeFormType.regional_form,
                gender: g,
                formId: region,
              } as SpecyficSelection)
          )
        );
      } else {
        specyficSelection.push({ formType: PokeFormType.form, formId: region });
      }
    });
  }

  return specyficSelection;
};
