import POKEDEX from "./pokedex-data.json" assert { type: "json" };
import BY_HAND from "./without-evos-by-hand.json" assert { type: "json" };

import fs from "fs";

BY_HAND.forEach(({ number, forms }) => {
  const pokemon = POKEDEX.find((pok) => pok.number === number);
  forms.forEach(({ id, evolvesIn }) => {
    const form = pokemon.forms.find((f) => f.id === id);
    if (!form.evolvesIn) {
      form.evolvesIn = evolvesIn;
    } else {
      form.evolvesIn.push(...evolvesIn);
    }
  });
});

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(POKEDEX));
