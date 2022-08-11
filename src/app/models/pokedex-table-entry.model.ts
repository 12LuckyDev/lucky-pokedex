import { PokedexEntry } from './pokedex-entry.model';

export interface PokedexTableEntry extends PokedexEntry {
  showGender: boolean;
}
