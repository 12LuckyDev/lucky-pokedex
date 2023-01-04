export interface SelectionStatistics {
  allPokemon: number;
  allForms: number;
  selectedPokemon: number;
  selectedForms: number;
}

export class SelectionStatisticsModel implements SelectionStatistics {
  allPokemon: number;
  allForms: number;
  selectedPokemon: number;
  selectedForms: number;

  constructor(allPokemon?: number) {
    this.allPokemon = allPokemon ?? 0;
    this.allForms = 0;
    this.selectedPokemon = 0;
    this.selectedForms = 0;
  }
}
