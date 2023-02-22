import POKEDEX from "./pokedex-data.json" assert { type: "json" };
import fs from "fs";

// FIXED BY HAND
// Shellos East Sea { number: 433, formId: 2 }
// "evolvesIn": [{ "number": 433, "formId": 2 }] =>
// "evolvesIn": [{ "number": 423, "formId": 2 }]

// fill evolvesFrom
POKEDEX.forEach(({ forms, number, name }) => {
  forms.forEach(({ evolvesIn, id, formName }) => {
    if (evolvesIn) {
      evolvesIn.forEach((evo) => {
        const pokemon = POKEDEX.find((p) => p.number === evo.number);
        const form = pokemon.forms.find((f) => f.id === evo.formId);
        if (!form) {
          console.log(name, formName, evo);
        }
        if (!form.evolvesFrom) {
          form.evolvesFrom = [{ number, formId: id }];
        } else {
          form.evolvesFrom.push({ number, formId: id });
        }
      });
    }
  });
});

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(POKEDEX));
