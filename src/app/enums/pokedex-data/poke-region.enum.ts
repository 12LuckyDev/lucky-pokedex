export enum PokeRegion {
  kanto = 0,
  johto = 1,
  hoenn = 2,
  sinnoh = 3,
  unova = 4,
  kalos = 5,
  alola = 6,
  unknown = 7,
  galar = 8,
  hisui = 9,
  paldea = 10,
}

export const POKE_REGIONS = Object.keys(PokeRegion)
  .filter((name) => isNaN(Number(name)))
  .map((name) => {
    return PokeRegion[name as keyof typeof PokeRegion];
  });
