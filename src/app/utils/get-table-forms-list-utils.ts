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
  formType: PokeFormType,
  showGender: boolean
): PokedexTableForm => {
  return {
    id: 0,
    types,
    genderDiffs,
    formType,
    formName: `${PokeFormType[formType]} ${name}`,
    showGender,
  };
};

const buildTableForm = (
  { id, types, formName }: PokedexFormEntry,
  formType: PokeFormType,
  showGender: boolean
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
    showGender,
  };
};

const buildTableRegionalForm = (
  { region, types, genderDiffs }: PokedexRegionalFormEntry,
  name: string,
  formType: PokeFormType,
  showGender: boolean
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
    showGender,
  };
};

export const getTableFormsList = (
  entry: PokedexEntry,
  {
    showForms,
    showFormGenders,
    showRegionalForms,
    showRegionalFormsGenders,
    showGigantamax,
    showGigantamaxGenders,
    showGigantamaxPerForm,
    showAlpha,
    showAlphaGenders,
    showAlphaForms,
    showAlphaRegionalForms,
  }: PokedexShowTypes
) => {
  const data: PokedexTableForm[] = [];
  const { formsData, regionalForms, name } = entry;

  if (showGigantamax && !showGigantamaxPerForm) {
    data.push(
      buildTableEntry(entry, PokeFormType.gigantamax, showGigantamaxGenders)
    );
  }

  if (showAlpha) {
    data.push(buildTableEntry(entry, PokeFormType.alpha, showAlphaGenders));
  }

  if (formsData && showForms) {
    formsData.forms.forEach((form) => {
      const showFormGender = showFormGenders.includes(form.id);
      data.push(buildTableForm(form, PokeFormType.form, showFormGender));

      if (showGigantamaxPerForm) {
        data.push(
          buildTableForm(
            form,
            PokeFormType.gigantamax,
            showFormGender && showGigantamaxGenders
          )
        );
      }

      if (showAlphaForms.includes(form.id)) {
        data.push(
          buildTableForm(
            form,
            PokeFormType.form_alpha,
            showFormGender && showAlphaGenders
          )
        );
      }
    });
  }

  if (regionalForms && showRegionalForms) {
    regionalForms.forEach((regionalForm) => {
      const showRFGender = showRegionalFormsGenders.includes(
        regionalForm.region
      );
      data.push(
        buildTableRegionalForm(
          regionalForm,
          name,
          PokeFormType.regional_form,
          showRFGender
        )
      );

      if (showAlphaRegionalForms.includes(regionalForm.region)) {
        data.push(
          buildTableRegionalForm(
            regionalForm,
            name,
            PokeFormType.regional_form_alpha,
            showRFGender && showAlphaGenders
          )
        );
      }
    });
  }

  return data;
};
