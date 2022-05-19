import POKEDEX from "./pokedex-data.json";
import fs from "fs";
import NEW_POKEMONS from "./new-pokemon.json";
import NEW_FORMS from "./new-forms.json";
import NEW_REGIONAL_FORMS from "./new-regional-forms.json";
import { mapTypes } from "../helpers/map-type.js";
import { mapForm } from "../helpers/map-form.js";
import { mapRegionalForm } from "../helpers/map-regional-form.js";

NEW_FORMS.forEach(({ number, formDiffsOnlyVisual, forms }) => {
  const pokemon = POKEDEX.find((x) => x.number === number);
  if (pokemon) {
    if (typeof formDiffsOnlyVisual === "boolean") {
      pokemon.formDiffsOnlyVisual = formDiffsOnlyVisual;
    }
    const mappedForms = forms.map((f) => mapForm(f));
    if (pokemon.forms) {
      pokemon.forms.push(...mappedForms);
    } else {
      pokemon.forms = forms;
    }
  }
});

NEW_REGIONAL_FORMS.forEach(({ number, regionalForms }) => {
  const pokemon = POKEDEX.find((x) => x.number === number);
  if (pokemon) {
    const mappedRegionalForms = regionalForms.map((rf) => mapRegionalForm(rf));
    if (pokemon.regionalForms) {
      pokemon.regionalForms.push(...mappedRegionalForms);
    } else {
      pokemon.regionalForms = mappedRegionalForms;
    }
  }
});

NEW_POKEMONS.forEach(({ types, forms, ...rest }) => {
  const mapped = { ...rest, types: mapTypes(types) };

  if (forms) {
    mapped.forms = forms.map((f) => mapForm(f));
  }

  POKEDEX.push(mapped);
});

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(POKEDEX));
