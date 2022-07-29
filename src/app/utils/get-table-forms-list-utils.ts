import { PokeFormType, PokeRegionalForm } from '../enums';
import {
  PokedexEntry,
  PokedexFormEntry,
  PokedexRegionalFormEntry,
  PokedexShowTypes,
  PokedexTableForm,
} from '../models';

const buildTableEntry = (
  { types, name, genderDiffs }: PokedexEntry,
  formType: PokeFormType
): PokedexTableForm => {
  return {
    id: 0,
    types,
    genderDiffs,
    formType,
    formName: `${PokeFormType[formType]} ${name}`,
  };
};

const buildTableForm = (
  { id, types, formName }: PokedexFormEntry,
  formType: PokeFormType
): PokedexTableForm => {
  return {
    id,
    types,
    formType,
    formName:
      formType === PokeFormType.form
        ? formName
        : `${
            formType === PokeFormType.form_alpha
              ? PokeFormType[PokeFormType.alpha]
              : PokeFormType[formType]
          } ${formName}`,
  };
};

const buildTableRegionalForm = (
  { region, types, genderDiffs }: PokedexRegionalFormEntry,
  name: string,
  formType: PokeFormType
): PokedexTableForm => {
  const regionalName = `${PokeRegionalForm[region]} ${name}`;
  return {
    id: region,
    types,
    genderDiffs,
    formType: PokeFormType.regional_form,
    formName:
      formType === PokeFormType.regional_form
        ? regionalName
        : `${
            formType === PokeFormType.regional_form_alpha
              ? PokeFormType[PokeFormType.alpha]
              : PokeFormType[formType]
          } ${regionalName}`,
  };
};

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
    data.push(buildTableEntry(entry, PokeFormType.gigantamax));
  }

  if (showAlpha) {
    data.push(buildTableEntry(entry, PokeFormType.alpha));
  }

  if (formsData && showForms) {
    formsData.forms.forEach((form) => {
      data.push(buildTableForm(form, PokeFormType.form));

      if (showGigantamaxPerForm) {
        data.push(buildTableForm(form, PokeFormType.gigantamax));
      }

      if (showAlphaForms.includes(form.id)) {
        data.push(buildTableForm(form, PokeFormType.form_alpha));
      }
    });
  }

  if (regionalForms && showRegionalForms) {
    regionalForms.forEach((regionalForm) => {
      data.push(
        buildTableRegionalForm(regionalForm, name, PokeFormType.regional_form)
      );

      if (showAlphaRegionalForms.includes(regionalForm.region)) {
        data.push(
          buildTableRegionalForm(
            regionalForm,
            name,
            PokeFormType.regional_form_alpha
          )
        );
      }
    });
  }

  return data;
};
