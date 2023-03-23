import POKEDEX from "./pokedex-data.json" assert { type: "json" };
import NEW_POKEMON from "./new-poke-base.json" assert { type: "json" };
import INFO from "./poke-info.json" assert { type: "json" };
import REGIONAL from "./regional.json" assert { type: "json" };
import FORMS from "./forms.json" assert { type: "json" };
import EVOS from "./linear-evo-chart.json" assert { type: "json" };
import BRANCH_EVOS from "./branch-evo-chain.json" assert { type: "json" };
import OBTAINABLE from "./obtainable.json" assert { type: "json" };

import { REGIONAL_FORM } from "../consts/regions.js";
import { FORM_TYPES } from "../consts/form-types.js";
import { RARITIES } from "../consts/rarity-types.js";
import { GENDERS } from "../consts/genders-types.js";
import { POKE_GAMES } from "../consts/poke-games.js";
import { OBTAIN_TYPES } from "../consts/obtain-types.js";

import { mapTypes } from "../helpers/map-type.js";

import fs from "fs";

POKEDEX.forEach(({ forms, number }) => {
  forms.forEach(({ obtainableIn, formId }) => {
    if (number !== 194 && formId !== 1) {
      if (obtainableIn) {
        obtainableIn.forEach(({ game, methods }) => {
          if (game === POKE_GAMES.scarlet || game === POKE_GAMES.violet) {
            const index = methods.indexOf(OBTAIN_TYPES.in_game_trade);
            if (index > -1) {
              methods[index] = OBTAIN_TYPES.teraraid;
            }
          }
        });
      }
    }
  });
});

NEW_POKEMON.forEach(({ number, name, types }) => {
  const _number = Number(number);
  const genderDiffsInfo = INFO.genderDiffs.find((el) => el.number === _number);
  const newPokemon = {
    number: _number,
    name,
    origin: REGIONAL_FORM.paldea,
    genders:
      INFO.femaleOnly.indexOf(_number) > -1
        ? [GENDERS.female]
        : INFO.genderless.indexOf(_number) > -1
        ? [GENDERS.genderless]
        : [GENDERS.male, GENDERS.female],
    rarity:
      INFO.legendary.indexOf(_number) > -1
        ? RARITIES.legendary
        : INFO.paradox.indexOf(_number) > -1
        ? RARITIES.paradox
        : RARITIES.standard,
    forms: [
      {
        id: 1,
        formType: FORM_TYPES.base,
        types: mapTypes(types),
        genderDiffs: genderDiffsInfo
          ? {
              desc: genderDiffsInfo.desc,
              onlyVisual: genderDiffsInfo.onlyVisual,
            }
          : undefined,
        movableTo: [POKE_GAMES.scarlet, POKE_GAMES.violet],
      },
    ],
  };

  POKEDEX.push(newPokemon);
});

REGIONAL.forEach(({ number, types, formName, obtainableIn }) => {
  const pokomon = POKEDEX.find((p) => p.number === number);
  const { forms } = pokomon;
  forms.push({
    id: forms[forms.length - 1].id + 1,
    formType: FORM_TYPES.regional_form,
    types,
    region: REGIONAL_FORM.paldea,
    movableTo: [POKE_GAMES.scarlet, POKE_GAMES.violet],
    formName,
    obtainableIn,
  });
});

FORMS.forEach(({ number, formsData, forms }) => {
  const pokemon = POKEDEX.find((p) => p.number === number);
  const existingForms = pokemon.forms;
  const baseFormData = existingForms[0];
  pokemon.forms = forms.map(({ id, formName }) => ({
    ...baseFormData,
    formType: FORM_TYPES.form,
    id,
    formName,
  }));
  pokemon.formsData = formsData;
});

EVOS.forEach((chain) => {
  chain.forEach(({ number, formId }, i) => {
    const pokemon = POKEDEX.find((p) => p.number === number);
    const form = pokemon.forms.find((f) => f.id === (formId ?? 1));

    if (i < chain.length - 1) {
      const next = chain[i + 1];
      form.evolvesIn = [{ formId: 1, ...next }];
    }

    if (i > 0) {
      const prev = chain[i - 1];
      form.evolvesFrom = [{ formId: 1, ...prev }];
    }
  });
});

BRANCH_EVOS.forEach(({ number, formId, evos }) => {
  const pokemon = POKEDEX.find((p) => p.number === number);
  const form = pokemon.forms.find((f) => f.id === formId);
  form.evolvesIn = evos;

  evos.forEach((evo) => {
    const evoPokemon = POKEDEX.find((p) => p.number === evo.number);
    const evoForm = evoPokemon.forms.find((f) => f.id === evo.formId);
    evoForm.evolvesFrom = [{ number, formId }];
  });
});

const handleObtainableIn = (form, catchableString, game) => {
  let catchableData = catchableString;
  const found = form.obtainableIn.find((o) => o.game === game);
  const obtainableInGame = found ?? {
    game,
    methods: [],
  };

  // c - catch
  if (catchableData.includes("c")) {
    catchableData = catchableData.replaceAll("c", "");
    obtainableInGame.methods.push(OBTAIN_TYPES.catch);
  }
  // t - terraraid
  if (catchableData.includes("t")) {
    catchableData = catchableData.replaceAll("t", "");
    obtainableInGame.methods.push(OBTAIN_TYPES.teraraid);
  }
  // f - starter
  if (catchableData.includes("f")) {
    catchableData = catchableData.replaceAll("f", "");
    obtainableInGame.methods.push(OBTAIN_TYPES.starter);
  }
  // g - in game gift
  if (catchableData.includes("g")) {
    catchableData = catchableData.replaceAll("g", "");
    obtainableInGame.methods.push(OBTAIN_TYPES.in_game_gift);
  }
  // r - in game trade
  if (catchableData.includes("r")) {
    catchableData = catchableData.replaceAll("r", "");
    obtainableInGame.methods.push(OBTAIN_TYPES.in_game_trade);
  }

  if (catchableData.length > 0) {
    console.log(catchableData);
  }

  if (!found) {
    form.obtainableIn.push(obtainableInGame);
  }
};

OBTAINABLE.forEach(({ number, formId, scarlet, violet }) => {
  const { forms } = POKEDEX.find((p) => p.number === number);

  (formId ? [forms.find((f) => f.id === formId)] : forms).forEach((form) => {
    if (!form.obtainableIn) {
      form.obtainableIn = [];
    }

    if (scarlet) {
      handleObtainableIn(form, scarlet, POKE_GAMES.scarlet);
    }
    if (violet) {
      handleObtainableIn(form, violet, POKE_GAMES.violet);
    }
  });
});

fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(POKEDEX));
