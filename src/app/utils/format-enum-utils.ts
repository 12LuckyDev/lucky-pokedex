import { PokeGender, PokeRarity, PokeRegion, PokeType } from '../enums';

export const formatGender = (gender: PokeGender) => PokeGender[gender];

export const formatType = (type: PokeType) => PokeType[type];

export const formatRegion = (region: PokeRegion) => {
  const regionStr = PokeRegion[region];
  return regionStr.charAt(0).toUpperCase() + regionStr.slice(1);
};

export const formatRarity = (rarity: PokeRarity) => PokeRarity[rarity];
