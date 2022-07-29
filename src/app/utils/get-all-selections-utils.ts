import { PokeFormType, PokeGender } from 'src/app/enums';
import {
  PokedexEntry,
  PokedexShowTypes,
  SpecyficSelection,
} from 'src/app/models';

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
  entry: PokedexEntry,
  {
    showGenders,
    showForms,
    showRegionalForms,
    showGigantamax,
    showGigantamaxPerForm,
    showAlpha,
    showAlphaForms,
    showAlphaRegionalForms,
  }: PokedexShowTypes
): SpecyficSelection[] => {
  const allSelection: SpecyficSelection[] = [];

  const { formsData, regionalForms, genders } = entry;

  if (showForms) {
    // Adding all forms selections
    formsData?.forms?.forEach(({ id: formId }) => {
      if (showGenders) {
        allSelection.push(
          ...buildGendersSelections(PokeFormType.form, genders, formId)
        );

        if (showGigantamaxPerForm) {
          allSelection.push(
            ...buildGendersSelections(PokeFormType.gigantamax, genders, formId)
          );
        }

        if (showAlphaForms.includes(formId)) {
          allSelection.push(
            ...buildGendersSelections(PokeFormType.form_alpha, genders, formId)
          );
        }
      } else {
        allSelection.push(buildSelection(PokeFormType.form, { formId }));

        if (showGigantamaxPerForm) {
          allSelection.push(
            buildSelection(PokeFormType.gigantamax, { formId })
          );
        }

        if (showAlphaForms.includes(formId)) {
          buildSelection(PokeFormType.form_alpha, { formId });
        }
      }
    });
  } else {
    // Adding all selections (without form info)
    if (showGenders) {
      allSelection.push(...buildGendersSelections(null, genders));

      if (showGigantamax) {
        allSelection.push(
          ...buildGendersSelections(PokeFormType.gigantamax, genders, 0)
        );
      }

      if (showAlpha) {
        allSelection.push(
          ...buildGendersSelections(PokeFormType.alpha, genders, 0)
        );
      }
    } else {
      allSelection.push(buildSelection(null));

      if (showGigantamax) {
        allSelection.push({ formType: PokeFormType.gigantamax, formId: 0 });
      }

      if (showAlpha) {
        allSelection.push({ formType: PokeFormType.alpha, formId: 0 });
      }
    }
  }

  if (showRegionalForms) {
    // Adding all regional forms selections
    regionalForms?.forEach(({ region: formId }) => {
      if (showGenders) {
        allSelection.push(
          ...buildGendersSelections(PokeFormType.regional_form, genders, formId)
        );

        if (showAlphaRegionalForms.includes(formId)) {
          allSelection.push(
            ...buildGendersSelections(
              PokeFormType.regional_form_alpha,
              genders,
              formId
            )
          );
        }
      } else {
        allSelection.push(
          buildSelection(PokeFormType.regional_form, { formId })
        );

        if (showAlphaRegionalForms.includes(formId)) {
          allSelection.push(
            buildSelection(PokeFormType.regional_form_alpha, { formId })
          );
        }
      }
    });
  }

  return allSelection;
};
