import POKEDEX from "./pokedex-data.json";
import FROM_ARCEUS from "./arceus-no-legendary.json";
import { REGIONAL_FORM } from "../consts/regions.js";
import fs from "fs";

//SPECIAL: Basculin

const NEW_POKEDEX = POKEDEX.map((p) => {
  if (FROM_ARCEUS.includes(p.name)) {
    const hisuianForm = p.regionalForms
      ? p.regionalForms.find((x) => x.region === REGIONAL_FORM.hisui)
      : null;

    if (hisuianForm) {
      hisuianForm.alpha = true;
    } else if (p.formsData) {
      if (p.name === "Basculin") {
        p.formsData.forms[2].alpha = true;
      } else {
        p.formsData.forms.forEach((x) => (x.alpha = true));
      }
    } else {
      p.alpha = true;
    }
  }
  return p;
});

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(NEW_POKEDEX));
