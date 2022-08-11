import { PokeVariantType, PokeRegionalForm } from '../enums';
import {
  PokedexEntry,
  PokedexFormEntry,
  PokedexRegionalFormEntry,
  PokedexShowTypes,
  PokedexTableVariant,
} from '../models';

const buildVariant = (
  { types, name, genderDiffs }: PokedexEntry,
  formType: PokeVariantType,
  showGender: boolean
): PokedexTableVariant => {
  return {
    id: 0,
    types,
    genderDiffs,
    formType,
    formName: `${PokeVariantType[formType]} ${name}`,
    showGender,
  };
};

const buildFormVariant = (
  { id, types, formName }: PokedexFormEntry,
  formType: PokeVariantType,
  showGender: boolean
): PokedexTableVariant => {
  return {
    id,
    types,
    formType,
    formName:
      formType === PokeVariantType.form
        ? formName
        : `${
            formType === PokeVariantType.form_alpha
              ? PokeVariantType[PokeVariantType.alpha]
              : PokeVariantType[formType]
          } ${formName}`,
    showGender,
  };
};

const buildRegionalFormVariant = (
  { region, types, genderDiffs }: PokedexRegionalFormEntry,
  name: string,
  formType: PokeVariantType,
  showGender: boolean
): PokedexTableVariant => {
  const regionalName = `${PokeRegionalForm[region]} ${name}`;
  return {
    id: region,
    types,
    genderDiffs,
    formType: PokeVariantType.regional_form,
    formName:
      formType === PokeVariantType.regional_form
        ? regionalName
        : `${
            formType === PokeVariantType.regional_form_alpha
              ? PokeVariantType[PokeVariantType.alpha]
              : PokeVariantType[formType]
          } ${regionalName}`,
    showGender,
  };
};

export const getTableVariantsList = (
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
  const data: PokedexTableVariant[] = [];
  const { formsData, regionalForms, name } = entry;

  if (showGigantamax && !showGigantamaxPerForm) {
    data.push(
      buildVariant(entry, PokeVariantType.gigantamax, showGigantamaxGenders)
    );
  }

  if (showAlpha) {
    data.push(buildVariant(entry, PokeVariantType.alpha, showAlphaGenders));
  }

  if (formsData && showForms) {
    formsData.forms.forEach((form) => {
      const showFormGender = showFormGenders.includes(form.id);
      data.push(buildFormVariant(form, PokeVariantType.form, showFormGender));

      if (showGigantamaxPerForm) {
        data.push(
          buildFormVariant(
            form,
            PokeVariantType.gigantamax,
            showFormGender && showGigantamaxGenders
          )
        );
      }

      if (showAlphaForms.includes(form.id)) {
        data.push(
          buildFormVariant(
            form,
            PokeVariantType.form_alpha,
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
        buildRegionalFormVariant(
          regionalForm,
          name,
          PokeVariantType.regional_form,
          showRFGender
        )
      );

      if (showAlphaRegionalForms.includes(regionalForm.region)) {
        data.push(
          buildRegionalFormVariant(
            regionalForm,
            name,
            PokeVariantType.regional_form_alpha,
            showRFGender && showAlphaGenders
          )
        );
      }
    });
  }

  return data;
};
