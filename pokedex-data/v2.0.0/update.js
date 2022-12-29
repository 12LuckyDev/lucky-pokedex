import POKEDEX from "./pokedex-data.json" assert { type: "json" };
import fs from "fs";
import { VARIATIES } from "../consts/varieties.js";
import { FORM_TYPES } from "../consts/form-types.js";

const NEW_POKEDEX = POKEDEX.map(
  ({
    number,
    name,
    origin,
    types,
    genders,
    genderDiffs,
    rarity,
    regionalForms,
    formsData,
    gigantamax,
    alpha,
  }) => {
    let formIdCounter = 0;

    const entry = {
      number,
      name,
      origin,
      genders,
      rarity,
      forms: [],
    };

    if (formsData) {
      const { forms, ...rest } = formsData;
      entry.formsData = { ...rest };
      entry.forms.push(
        ...forms.map((form) => {
          formIdCounter++;

          const formForm = {
            id: formIdCounter,
            formType: FORM_TYPES.form,
            formName: form.formName,
            types: form.types,
          };

          const varieties = [
            gigantamax?.factor ? VARIATIES.gigantamax : null,
            form.alpha ? VARIATIES.alpha : null,
          ].filter((x) => x !== null);

          if (varieties.length > 0) {
            formForm.varieties = varieties;
          }

          return formForm;
        })
      );
    } else {
      formIdCounter++;

      const baseForm = {
        id: formIdCounter,
        formType: FORM_TYPES.base,
        types,
        genderDiffs,
      };

      const varieties = [
        gigantamax?.factor ? VARIATIES.gigantamax : null,
        alpha ? VARIATIES.alpha : null,
      ].filter((x) => x !== null);

      if (varieties.length > 0) {
        baseForm.varieties = varieties;
      }

      entry.forms.push(baseForm);
    }

    if (gigantamax?.formDiffs) {
      if (entry.formsData) {
        entry.formsData.gigantamaxFormDiffs = true;
      } else {
        entry.formsData = { gigantamaxFormDiffs: true };
      }
    }

    if (regionalForms) {
      entry.forms.push(
        ...regionalForms.map((form) => {
          formIdCounter++;

          const regionalForm = {
            id: formIdCounter,
            formType: FORM_TYPES.regional_form,
            types: form.types,
            region: form.region,
            genderDiffs: form.genderDiffs,
          };

          const varieties = [form.alpha ? VARIATIES.alpha : null].filter(
            (x) => x !== null
          );

          if (varieties.length > 0) {
            regionalForm.varieties = varieties;
          }

          return regionalForm;
        })
      );
    }

    return entry;
  }
);

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(NEW_POKEDEX));
