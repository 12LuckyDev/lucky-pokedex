import fs from "fs";

import NO_MAPPED_LINEAR from "./unmap-linear-evo-chart.json" assert { type: "json" };
import { REGIONAL_FORM } from "../consts/regions.js";

const LINEAR = NO_MAPPED_LINEAR.map((el) =>
  el.map(({ number, form }) => {
    const result = { number: Number(number.replace("#", "")) };
    if (form) {
      if (form.includes("Alolan")) {
        result.region = REGIONAL_FORM.alola;
      } else if (form.includes("Galarian")) {
        result.region = REGIONAL_FORM.galar;
      } else if (form.includes("Hisuian")) {
        result.region = REGIONAL_FORM.hisui;
      } else if (form.includes("Paldean")) {
        result.region = REGIONAL_FORM.paldea;
      } else {
        result.form = form;
      }
    }
    return result;
  })
);

fs.writeFileSync("./linear-evo-chart.json", JSON.stringify(LINEAR));

import NO_MAPPED_FULLY_EVO from "./unmap-fully-evo.json" assert { type: "json" };

const FULLY = [];

NO_MAPPED_FULLY_EVO.forEach((el) => {
  if (!el.name.includes("Partner")) {
    const number = Number(el.number.replace("\\n", ""));

    if (FULLY.find((x) => x.number === number)) {
      const result = { number };

      if (el.name.includes("Alolan")) {
        result.region = REGIONAL_FORM.alola;
      } else if (el.name.includes("Galarian")) {
        result.region = REGIONAL_FORM.galar;
      } else if (el.name.includes("Hisuian")) {
        result.region = REGIONAL_FORM.hisui;
      } else if (el.name.includes("Paldean")) {
        result.region = REGIONAL_FORM.paldea;
      }
      if (result.region) {
        FULLY.push(result);
      }
    } else {
      FULLY.push({ number });
    }
  }
});

fs.writeFileSync("./fully-evo.json", JSON.stringify(FULLY));
