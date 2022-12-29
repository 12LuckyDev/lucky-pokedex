import { PokedexEntry } from './pokedex-entry.model';
import { PokedexTableVariant } from './pokedex-table-variant.model';

export interface PokedexTableEntry extends PokedexEntry {
  variants: PokedexTableVariant[];
  showForms: boolean;
}
