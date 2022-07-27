import { PokeFormType } from 'src/app/enums';
import {
  PokedexEntry,
  PokedexShowTypes,
  SpecyficSelection,
} from 'src/app/models';

// TODO Try to compress code (maybe move some code to functions)
// I can't read this now :P

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
  const specyficSelection: SpecyficSelection[] = [];

  const { formsData, regionalForms, genders } = entry;

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

        if (showGigantamaxPerForm) {
          specyficSelection.push(
            ...genders.map(
              (g) =>
                ({
                  formType: PokeFormType.gigantamax,
                  gender: g,
                  formId: id,
                } as SpecyficSelection)
            )
          );
        }

        if (showAlphaForms.includes(id)) {
          specyficSelection.push(
            ...genders.map(
              (g) =>
                ({
                  formType: PokeFormType.form_alpha,
                  gender: g,
                  formId: id,
                } as SpecyficSelection)
            )
          );
        }
      } else {
        specyficSelection.push({ formType: PokeFormType.form, formId: id });
        if (showGigantamaxPerForm) {
          specyficSelection.push({
            formType: PokeFormType.gigantamax,
            formId: id,
          });
        }

        if (showAlphaForms.includes(id)) {
          specyficSelection.push({
            formType: PokeFormType.form_alpha,
            formId: id,
          });
        }
      }
    });
  } else if (showGenders) {
    specyficSelection.push(
      ...genders.map((g) => ({ formType: null, gender: g }))
    );
    if (showGigantamax) {
      specyficSelection.push(
        ...genders.map((g) => ({
          formType: PokeFormType.gigantamax,
          formId: 0,
          gender: g,
        }))
      );
    }

    if (showAlpha) {
      specyficSelection.push(
        ...genders.map((g) => ({
          formType: PokeFormType.alpha,
          formId: 0,
          gender: g,
        }))
      );
    }
  } else {
    specyficSelection.push({ formType: null });
    if (showGigantamax) {
      specyficSelection.push({ formType: PokeFormType.gigantamax, formId: 0 });
    }

    if (showAlpha) {
      specyficSelection.push({ formType: PokeFormType.alpha, formId: 0 });
    }
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

        if (showAlphaRegionalForms.includes(region)) {
          specyficSelection.push(
            ...genders.map(
              (g) =>
                ({
                  formType: PokeFormType.regional_form_alpha,
                  gender: g,
                  formId: region,
                } as SpecyficSelection)
            )
          );
        }
      } else {
        specyficSelection.push({
          formType: PokeFormType.regional_form,
          formId: region,
        });

        if (showAlphaRegionalForms.includes(region)) {
          specyficSelection.push({
            formType: PokeFormType.regional_form_alpha,
            formId: region,
          });
        }
      }
    });
  }

  return specyficSelection;
};
