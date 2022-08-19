import { PokeGender, PokeRegion, PokeType } from '../enums';

export const formatGender = (gender: PokeGender) => PokeGender[gender];

export const formatType = (type: PokeType) => PokeType[type];

export const formatRegion = (region: PokeRegion) => PokeRegion[region];
