import POKEDEX from "./pokedex-data.json";
import fs from "fs";

POKEDEX.forEach((entry) => {
  if (entry.genderDiffs) {
    entry.genderDiffs.femaleImgPath = undefined;
  }

  if (entry.formsData) {
    entry.formsData?.forms?.forEach((form) => {
      form.imgPath = undefined;
    });
  }

  if (entry.regionalForms) {
    entry.regionalForms?.forEach((regionalForm) => {
      regionalForm.imgPath = undefined;
    });
  }
});

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(POKEDEX));
