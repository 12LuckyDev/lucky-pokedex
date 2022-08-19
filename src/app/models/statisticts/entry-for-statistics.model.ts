import { PokedexTableEntry } from '../pokedex-table-entry.model';
import { SpecyficSelection } from '../selection/specyfic-selection.model';

export interface EntryForStatistics {
  entry: PokedexTableEntry;
  selection: SpecyficSelection[];
  allSelection: SpecyficSelection[];
}
