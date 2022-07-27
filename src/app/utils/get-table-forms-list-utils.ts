import { PokeFormType, PokeRegionalForm } from '../enums';
import { PokedexEntry, PokedexShowTypes, PokedexTableForm } from '../models';

// TODO Try to compress code (maybe move some code to functions)

export const getTableFormsList = (
  entry: PokedexEntry,
  {
    showForms,
    showRegionalForms,
    showGigantamax,
    showGigantamaxPerForm,
    showAlpha,
    showAlphaForms,
    showAlphaRegionalForms,
  }: PokedexShowTypes
) => {
  const data: PokedexTableForm[] = [];
  const { formsData, regionalForms, name } = entry;

  if (showGigantamax && !showGigantamaxPerForm) {
    data.push({
      id: 0,
      types: entry.types,
      formType: PokeFormType.gigantamax,
      formName: `Gigantamax ${entry.name}`,
    });
  }

  if (showAlpha) {
    data.push({
      id: 0,
      types: entry.types,
      formType: PokeFormType.alpha,
      formName: `Alpha ${entry.name}`,
    });
  }

  if (formsData && showForms) {
    formsData.forms.forEach((form) => {
      data.push({ ...form, formType: PokeFormType.form });
      if (showGigantamaxPerForm) {
        data.push({
          id: form.id,
          types: form.types,
          formType: PokeFormType.gigantamax,
          formName: `Gigantamax ${form.formName}`,
        });
      }
      if (showAlphaForms.includes(form.id)) {
        data.push({
          id: form.id,
          types: form.types,
          formType: PokeFormType.form_alpha,
          formName: `Alpha ${form.formName}`,
        });
      }
    });
  }

  if (regionalForms && showRegionalForms) {
    regionalForms.forEach(({ region, types, genderDiffs }) => {
      data.push({
        id: region,
        types,
        genderDiffs,
        formType: PokeFormType.regional_form,
        formName: `${PokeRegionalForm[region]} ${name}`,
      });
      if (showAlphaRegionalForms.includes(region)) {
        data.push({
          id: region,
          types,
          formType: PokeFormType.regional_form_alpha,
          formName: `Alpha ${PokeRegionalForm[region]} ${name}`,
        });
      }
    });
  }

  return data;
};
