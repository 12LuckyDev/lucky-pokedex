import {
  PokeGender,
  PokeRarity,
  PokeRegion,
  PokeRegionalForm,
  PokeType,
  PokeVariety,
} from '../enums';

const upperCaseFirst = (text: string): string =>
  `${text.charAt(0).toUpperCase()}${text.slice(1)}`;

export const formatGender = (gender: PokeGender) => PokeGender[gender];

export const formatType = (type: PokeType) => PokeType[type];

export const formatRegion = (region: PokeRegion) =>
  upperCaseFirst(PokeRegion[region]);

export const formatRegionalName = (region: PokeRegion) =>
  upperCaseFirst(PokeRegionalForm[region]);

export const formatRarity = (rarity: PokeRarity) => PokeRarity[rarity];

export const formatVariety = (variety: PokeVariety) =>
  upperCaseFirst(PokeVariety[variety]);
