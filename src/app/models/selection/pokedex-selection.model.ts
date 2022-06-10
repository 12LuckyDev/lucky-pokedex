import { PokeGender, PokeRegion } from 'src/app/enums';

export interface PokedexSelection {
  specyficSelection: SpecyficSelection[];
}

export interface SpecyficSelection {
  baseForm: boolean;
  gender?: PokeGender;
  formId?: number;
  regionalForm?: PokeRegion;
}

export class PokedexSelectionModel implements PokedexSelection {
  specyficSelection: SpecyficSelection[];

  constructor() {
    this.specyficSelection = [];
  }
}
