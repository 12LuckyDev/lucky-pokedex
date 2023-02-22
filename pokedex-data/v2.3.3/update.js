import POKEDEX from "./pokedex-data.json" assert { type: "json" };
import fs from "fs";
import { POKE_GAMES } from "../consts/poke-games.js";

POKEDEX.forEach(({ forms }) => {
  forms.forEach(({ movableTo }) => {
    const index = movableTo.indexOf(11);
    if (index > -1) {
      movableTo[index] = POKE_GAMES.home;
    }
  });
});

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(POKEDEX));
