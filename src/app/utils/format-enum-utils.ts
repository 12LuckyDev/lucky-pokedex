import { PokeGender, PokeType } from '../enums';

export const formatGender = (gender: PokeGender) => PokeGender[gender];

export const formatType = (type: PokeType) => PokeType[type];
