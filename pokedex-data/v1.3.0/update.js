import POKEDEX from "./pokedex-data.json";
import GIGANTAMAX from "./gigantamax.json";
import fs from "fs";

const NEW_POKEDEX = POKEDEX.map((p) => {
  const gigaInfo = GIGANTAMAX.find(({ number }) => number === p.number);
  return gigaInfo
    ? {
        ...p,
        gigantamax: {
          factor: true,
          formDiffs: gigaInfo.forEachForm,
        },
      }
    : p;
});

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(NEW_POKEDEX));
