import POKEDEX from "./pokedex-data.json" assert { type: "json" };
import fs from "fs";
import { OBTAIN_TYPES } from "../consts/obtain-types.js";

// Change by hand Oricorio interchandable false -> true

//REMOVE Obtain method change form with item
POKEDEX.forEach(({ forms }) => {
  forms.forEach((form) => {
    if (form.obtainableIn) {
      form.obtainableIn = form.obtainableIn.map((el) => {
        const methods = el.methods.filter(
          (m) => m !== OBTAIN_TYPES.change_form_with_item
        );
        if (methods.length !== el.methods.length) {
          console.log("remove change_form_with_item");
        }
        return {
          ...el,
          methods,
        };
      });

      form.obtainableIn = form.obtainableIn.filter(
        (el) => el.methods.length > 0
      );
      if (form.obtainableIn.length === 0) {
        form.obtainableIn = undefined;
      }
    }
  });
});

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(POKEDEX));
