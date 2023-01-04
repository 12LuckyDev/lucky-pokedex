import { PokedexTableEntry } from '../pokedex-table/pokedex-table-entry.model';
import { SpecyficSelection } from './specyfic-selection.model';

export interface SelectionChangeInfo {
  entry: PokedexTableEntry;
  newSelection: SpecyficSelection[];
  oldSelection: SpecyficSelection[];
  userInput: boolean;
}
