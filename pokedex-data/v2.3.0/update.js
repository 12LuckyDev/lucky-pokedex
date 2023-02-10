import POKEDEX from "./pokedex-data.json" assert { type: "json" };
import fs from "fs";

const NEW_POKEDEX = POKEDEX.map((p) => {
  return {
    ...p,
  };
});

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(NEW_POKEDEX));
