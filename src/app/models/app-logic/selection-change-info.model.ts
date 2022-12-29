import { PokedexTableEntry } from '../pokedex-table-entry.model';
import { SpecyficSelection } from '../selection/specyfic-selection.model';

export interface SelectionChangeInfo {
  entry: PokedexTableEntry;
  newSelection: SpecyficSelection[];
  oldSelection: SpecyficSelection[];
  userInput: boolean;
}
