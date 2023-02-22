import POKEDEX from "./pokedex-data.json" assert { type: "json" };
import fs from "fs";

import LINEAR from "./linear-evo-chart.json" assert { type: "json" };
import BRANCH from "./branch-evo-chain.json" assert { type: "json" };
import NO_EVOS from "./no-evo.json" assert { type: "json" };
import FULLY_EVOS from "./fully-evo.json" assert { type: "json" };

const MAX_NUMBER = 905;

const getForm = (actual, number, formId, region, formName) => {
  const entry = POKEDEX.find((p) => p.number === number);
  let form = null;

  if (!entry) {
    console.error("ENTRY NOT FOUND BY NUMBER", number);
    return null;
  }

  if (region) {
    form = entry.forms.find((f) => f.region === region);
  }
  if (!form && formName) {
    form = entry.forms.find((f) => f.formName === formName);
  }
  if (!form && formId) {
    form = entry.forms.find((f) => f.id === formId);
  }

  if (!form) {
    return null;
  }

  if (actual && !form.evolvesIn) {
    form.evolvesIn = [];
  }

  return form;
};

console.log("============= LINEAR EVOS =============/n/n/n");

LINEAR.forEach((evoChain) => {
  evoChain.forEach(({ number, region, form }, i) => {
    if (number <= MAX_NUMBER) {
      const next = i + 1 === evoChain.length ? null : evoChain[i + 1];
      if (next) {
        const nextForm = getForm(false, next.number, 1, next.region, next.form);
        const actualForm = getForm(true, number, 1, region, form);
        if (nextForm && actualForm) {
          actualForm.evolvesIn.push({
            number: next.number,
            formId: nextForm.id,
          });
        } else {
          if (!actualForm) {
            console.error("FORM NOT FOUND", number, region, form);
          }
          if (!nextForm) {
            const entry = POKEDEX.find((p) => p.number === number);

            console.error(
              "EVOLUTION OF",
              entry?.name,
              number,
              region,
              form,
              "NOT FOUND",
              next.number,
              next.region,
              next.form
            );
          }
          console.log("==============================================");
        }
      }
    }
  });
});

console.log("============= BRANCH EVOS =============/n/n/n");
BRANCH.forEach((el) => {
  if (typeof el === "string") {
    console.log(el);
  } else {
    const { number, formId, evos } = el;
    if (el.number <= MAX_NUMBER) {
      const form = getForm(true, number, formId, formId);
      evos.forEach((evo) => {
        // formId can be region or form id => getForm first try to find regional
        const evoForm = getForm(false, evo.number, evo.formId, evo.formId);
        if (evoForm) {
          form.evolvesIn.push({ number: evo.number, formId: evoForm.id });
        } else {
          const entry = POKEDEX.find((p) => p.number === number);

          console.error(
            "EVOLUTION OF",
            entry?.name,
            number,
            formId,
            "NOT FOUND",
            evo.number,
            evo.formId
          );
        }
      });
    }
  }
});

console.log("============= CHECK =============/n/n/n");
const withoutEvos = [];
POKEDEX.forEach((p) => {
  if (!NO_EVOS.includes(p.number)) {
    const formsWithoutEvos = p.forms.filter((f) => {
      const noEvos = !f.evolvesIn || f.evolvesIn.length === 0;
      if (!noEvos) {
        return false;
      }

      if (f.formType === 2) {
        if (
          FULLY_EVOS.find(
            (full) => full.number === p.number && full.region === f.region
          )
        ) {
          return false;
        }
      } else if (f.formType === 0) {
        if (
          FULLY_EVOS.find((full) => full.number === p.number && !full.region)
        ) {
          return false;
        }
      }

      return true;
    });
    if (formsWithoutEvos.length > 0) {
      withoutEvos.push({
        ...p,
        forms: formsWithoutEvos,
      });
    }
  }
});

fs.writeFileSync("./v2.3.0/without-evos.json", JSON.stringify(withoutEvos));
fs.writeFileSync("./new-pokedex-data.json", JSON.stringify(POKEDEX));

//source
//https://pokemondb.net/evolution
// scraping
// const easy = [
//   ...document.querySelectorAll(".infocard-filter-block > .infocard-list-evo"),
// ].filter(
//   (x) =>
//     ![...x.children].find((el) => el.className.includes("infocard-evo-split"))
// );

// const evo = (el) =>
//   [...el.children]
//     .filter((el) => !el.className.includes("infocard-arrow"))
//     .map((el) => el.children[1])
//     .map((el) => ({
//       number: el.children[0].textContent,
//       form: el.children.length > 5 ? el.children[4].textContent : null,
//     }));

//     JSON.stringify(easy.map((el, i) => evo(el)))

// no evos
//https://pokemondb.net/evolution/none
// scraping

// JSON.stringify(
//   [...document.querySelectorAll(".infocard-list-pkmn-lg")]
//     .map((el) =>
//       [...el.children].map((child) => child.children[1].children[0].textContent)
//     )
//     .reduce((acc, cur) => [...acc, ...cur], [])
//     .map((el) => Number(el.replace("#", "")))
// );

// fully evos
// https://bulbapedia.bulbagarden.net/wiki/List_of_fully_evolved_Pok%C3%A9mon_by_base_stats

// const rows = [...document.querySelector("table").children[1].children];

// JSON.stringify(
//   rows.map((row) => ({
//     number: row.children[0].textContent,
//     name: row.children[2].textContent,
//   }))
// );
