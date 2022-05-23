import fs from "fs";
import POKEDEX from "./pokedex-data.json";
import FORM_UPDATES from "./form-updates.json";

const NEW_POKEDEX = POKEDEX.map(({ formDiffsOnlyVisual, forms, ...p }) => {
  const newModel = {
    ...p,
  };

  if (forms) {
    const { number, ...formUpdate } =
      FORM_UPDATES.find(({ number }) => number === p.number) ?? null;

    newModel.formsData = {
      forms,
      onlyVisual: formDiffsOnlyVisual,
      interchandable: false,
      ...formUpdate,
    };
  }

  return newModel;
});

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(NEW_POKEDEX));
