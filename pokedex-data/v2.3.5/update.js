import POKEDEX from "./pokedex-data.json" assert { type: "json" };
import fs from "fs";

// REMOVE most of gender diffs desc
POKEDEX.forEach(({ forms }) => {
  forms.forEach((form) => {
    if (form.genderDiffs) {
      if (form.genderDiffs.onlyVisual) {
        form.genderDiffs.desc = undefined;
      }
    }
  });
});
// CHANGE BY HAND descs that has been left

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(POKEDEX));
