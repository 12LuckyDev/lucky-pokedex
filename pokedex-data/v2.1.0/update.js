import POKEDEX from "./pokedex-data.json" assert { type: "json" };
import fs from "fs";

import { POKE_GAMES } from "../consts/poke-games.js";
import { FORM_TYPES } from "../consts/form-types.js";
import { REGIONAL_FORM } from "../consts/regions.js";

import LEGENDS_ARCEUS_POKEDEX from "./legends-arceus-pokedex.json" assert { type: "json" };
import SW_SH_POKEDEX from "./sw-sh-pokedex.json" assert { type: "json" };
import SW_SH_EXTRAS_POKEDEX from "./sw-sh-extras-pokedex.json" assert { type: "json" };
import ISLE_OF_ARMOR_POKEDEX from "./isle-of-armor-pokedex.json" assert { type: "json" };
import CROWN_TUNDRA_POKEDEX from "./crown-tundra-pokedex.json" assert { type: "json" };

const SW_SH_FULL_POKEDEX = [
  ...new Set([
    ...SW_SH_POKEDEX,
    ...SW_SH_EXTRAS_POKEDEX,
    ...ISLE_OF_ARMOR_POKEDEX,
    ...CROWN_TUNDRA_POKEDEX,
  ]),
];

const NEW_POKEDEX = POKEDEX.map((p) => {
  const { number, name, forms } = p;

  const hasHisuianForm = !!forms.find((f) => f.region === REGIONAL_FORM.hisui);

  forms.forEach((form) => {
    const { formType, region, id } = form;
    const movableTo = [];

    // LET'S GO
    // Only first gen + Meltan and Melmetal (base and alolan forms)
    if (number < 152 || number === 808 || number === 809) {
      // Base forms
      if (formType === FORM_TYPES.base) {
        movableTo.push(POKE_GAMES.lets_go_pikachu);
        movableTo.push(POKE_GAMES.lets_go_eevee);
      }
      // First gen alolan (all alolan)
      else if (region === REGIONAL_FORM.alola) {
        movableTo.push(POKE_GAMES.lets_go_pikachu);
        movableTo.push(POKE_GAMES.lets_go_eevee);
      }
    }

    // BD/SP
    // Only first 4 gens (without regional forms)
    if (number < 494) {
      // without regional forms
      if (formType !== FORM_TYPES.regional_form) {
        movableTo.push(POKE_GAMES.brilliant_diamond);
        movableTo.push(POKE_GAMES.shining_pearl);
      }
    }

    // It's starting to get complicated

    // LEGENDS ARCEUS
    // Only if exist in pokedex
    if (LEGENDS_ARCEUS_POKEDEX.includes(name)) {
      // Both Sneasel forms are available
      if (number === 215) {
        movableTo.push(POKE_GAMES.legends_arceus);
      }
      // Only White-Striped Basculin is available
      else if (number === 550 && id === 3) {
        movableTo.push(POKE_GAMES.legends_arceus);
      }
      // Alolan Vulpix and Ninetales are only alolan forms available
      else if ((number === 37 || number === 38) && region === 6) {
        movableTo.push(POKE_GAMES.legends_arceus);
      } else {
        // if has hisuian form then it's only available form
        if (hasHisuianForm && region === REGIONAL_FORM.hisui) {
          movableTo.push(POKE_GAMES.legends_arceus);
        }
        // else all forms without regional
        else if (formType !== FORM_TYPES.regional_form) {
          movableTo.push(POKE_GAMES.legends_arceus);
        }
      }
    }

    // SW/SH
    // If exist in full pokedex (SW/SH, Isle of Armor, Crown Tundra pokedex + all legendaries, ultrabeasts, Meltan and Melmetal)
    if (SW_SH_FULL_POKEDEX.includes(name)) {
      // Base and forms
      if (formType !== FORM_TYPES.regional_form) {
        movableTo.push(POKE_GAMES.sword);
        movableTo.push(POKE_GAMES.shield);
      }
      // Alolan forms from pokemon that exist in pokedex and galarian
      else if (region === REGIONAL_FORM.alola || REGIONAL_FORM.galar) {
        movableTo.push(POKE_GAMES.sword);
        movableTo.push(POKE_GAMES.shield);
      }
    }
    movableTo.push(POKE_GAMES.home);
    movableTo.sort();
    form.movableTo = movableTo;
  });

  return p;
});

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(NEW_POKEDEX));

// data scrapped from www.serebii.net
// JSON.stringify([...document.querySelectorAll('table')[1].children[0].children].map(el => el.children[2].children[0]).filter(x => x).map(el => el.innerText.split('\n')[0]))
