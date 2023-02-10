import POKEDEX from "./pokedex-data.json" assert { type: "json" };
import fs from "fs";
import readXlsxFile from "read-excel-file/node";

import { POKE_GAMES } from "../consts/poke-games.js";
import { OBTAIN_TYPES } from "../consts/obtain-types.js";

const COLUMNS = [
  POKE_GAMES.lets_go_pikachu,
  POKE_GAMES.lets_go_eevee,
  POKE_GAMES.sword,
  POKE_GAMES.isle_of_armor_sword,
  POKE_GAMES.crown_tundra_sword,
  POKE_GAMES.shield,
  POKE_GAMES.isle_of_armor_shield,
  POKE_GAMES.crown_tundra_shield,
  POKE_GAMES.brilliant_diamond,
  POKE_GAMES.shining_pearl,
  POKE_GAMES.legends_arceus,
  POKE_GAMES.scarlet,
  POKE_GAMES.violet,
];

readXlsxFile("./v2.2.0/catchable_in.xlsx").then((rows) => {
  const [header, ...pokemons] = rows;
  pokemons.forEach((cells) => {
    const [name, ids, ...catchable] = cells;
    const [number, formId] = ids.split("_").map((el) => Number(el));
    const pokemon = POKEDEX.find((p) => p.number === number);
    const form = pokemon.forms.find((f) => f.id === formId);

    const obtainableIn = [];
    COLUMNS.forEach((game, col) => {
      let catchableData = catchable[col];
      if (catchableData) {
        const obtainableInGame = { game, methods: [] };

        // c - catch
        if (catchableData.includes("c")) {
          catchableData = catchableData.replaceAll("c", "");
          obtainableInGame.methods.push(OBTAIN_TYPES.catch);
        }
        // t - trade with npc
        if (catchableData.includes("t")) {
          catchableData = catchableData.replaceAll("t", "");
          obtainableInGame.methods.push(OBTAIN_TYPES.in_game_trade);
        }
        // g - npc gift or fossil
        if (catchableData.includes("g")) {
          catchableData = catchableData.replaceAll("g", "");
          obtainableInGame.methods.push(OBTAIN_TYPES.in_game_gift);
        }
        // a - dynamax adventures
        if (catchableData.includes("a")) {
          catchableData = catchableData.replaceAll("a", "");
          obtainableInGame.methods.push(OBTAIN_TYPES.dynamax_adventures);
        }
        // x - gigantamax
        if (catchableData.includes("x")) {
          catchableData = catchableData.replaceAll("x", "");
          obtainableInGame.methods.push(OBTAIN_TYPES.gigantamax_raid_battles);
        }
        // d - dynamax
        if (catchableData.includes("d")) {
          catchableData = catchableData.replaceAll("d", "");
          obtainableInGame.methods.push(OBTAIN_TYPES.dynamax_adventures);
        }
        // m - massive mass outbreak
        if (catchableData.includes("m")) {
          catchableData = catchableData.replaceAll("m", "");
          obtainableInGame.methods.push(OBTAIN_TYPES.massive_mass_outbreak);
        }
        // s - stace-time distorsions
        if (catchableData.includes("s")) {
          catchableData = catchableData.replaceAll("s", "");
          obtainableInGame.methods.push(OBTAIN_TYPES.stace_time_distorsions);
        }
        // f - first pokemon - starter
        if (catchableData.includes("f")) {
          catchableData = catchableData.replaceAll("f", "");
          obtainableInGame.methods.push(OBTAIN_TYPES.starter);
        }
        // t - teraraid
        if (catchableData.includes("t")) {
          catchableData = catchableData.replaceAll("t", "");
          obtainableInGame.methods.push(OBTAIN_TYPES.teraraid);
        }
        // i - change form with item
        if (catchableData.includes("i")) {
          catchableData = catchableData.replaceAll("i", "");
          obtainableInGame.methods.push(OBTAIN_TYPES.change_form_with_item);
        }

        if (catchableData.length > 0) {
          console.error(`${name} | ${ids} | ${game} | ${catchableData}`);
        }

        if (obtainableInGame.methods.length > 0) {
          obtainableIn.push(obtainableInGame);
        }
      }
    });

    form.obtainableIn = obtainableIn;
  });
  fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(POKEDEX));
});
