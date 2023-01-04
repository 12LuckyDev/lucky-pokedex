import { PokedexTableEntry } from '../../pokedex-table/pokedex-table-entry.model';
import { SpecyficSelection } from '../specyfic-selection.model';

export interface EntryForStatistics {
  entry: PokedexTableEntry;
  selection: SpecyficSelection[];
  allSelection: SpecyficSelection[];
}
