import { Injectable } from '@angular/core';
import { PokeRegion, POKE_REGIONS } from 'src/app/enums';
import { StatisticsSubjects } from './pokedex-statistics-subjects';
import {
  EntryForStatistics,
  PokedexTableEntry,
  SelectionStatistics,
  SelectionStatisticsModel,
  SpecyficSelection,
  StatisticsObservables,
} from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class PokedexStatisticsService {
  private _allSelectionSubjects: StatisticsSubjects;
  private _regionalSelectionSubjects: Map<PokeRegion, StatisticsSubjects>;

  constructor() {
    this._allSelectionSubjects = new StatisticsSubjects();
    this._regionalSelectionSubjects = new Map<PokeRegion, StatisticsSubjects>();
    POKE_REGIONS.forEach((region: PokeRegion) =>
      this._regionalSelectionSubjects.set(region, new StatisticsSubjects())
    );
  }

  public get allSelectionObservables(): StatisticsObservables {
    return this._allSelectionSubjects.observables;
  }

  public get regionalObservables(): {
    region: PokeRegion;
    observables: StatisticsObservables;
  }[] {
    const keys = [...this._regionalSelectionSubjects.keys()];
    const values = [...this._regionalSelectionSubjects.values()];
    return keys.map((region, i) => ({
      region,
      observables: values[i].observables,
    }));
  }

  private refreshSubjectsPerEntry(
    subjects: StatisticsSubjects,
    newSelection: SpecyficSelection[],
    oldSelection: SpecyficSelection[],
    allSelection: SpecyficSelection[]
  ) {
    const { selectedPokemon, selectedForms } = subjects;
    let newSelectedPokemon = selectedPokemon;
    const allFormSelectionCount = allSelection.length;
    if (allFormSelectionCount === oldSelection.length) {
      --newSelectedPokemon;
    }
    if (allFormSelectionCount === newSelection.length) {
      ++newSelectedPokemon;
    }

    subjects.refreshSelected(
      newSelectedPokemon,
      selectedForms - oldSelection.length + newSelection.length
    );
  }

  public refreshPerEntry(
    entry: PokedexTableEntry,
    newSelection: SpecyficSelection[],
    oldSelection: SpecyficSelection[],
    allSelection: SpecyficSelection[]
  ) {
    this.refreshSubjectsPerEntry(
      this._allSelectionSubjects,
      newSelection,
      oldSelection,
      allSelection
    );

    const regional = this._regionalSelectionSubjects.get(entry.origin);
    if (regional) {
      this.refreshSubjectsPerEntry(
        regional,
        newSelection,
        oldSelection,
        allSelection
      );
    }
  }

  public refreshStatistics(data: EntryForStatistics[], count: number): void {
    const allStatistics = new SelectionStatisticsModel(count);
    const regionalStatistics = new Map<PokeRegion, SelectionStatistics>();

    data.forEach(({ entry, selection, allSelection }) => {
      allStatistics.selectedForms += selection.length;
      if (selection.length === allSelection.length) {
        allStatistics.selectedPokemon++;
      }

      allStatistics.allForms += allSelection.length;

      const entryRegional =
        regionalStatistics.get(entry.origin) ?? new SelectionStatisticsModel();
      if (!regionalStatistics.has(entry.origin)) {
        regionalStatistics.set(entry.origin, entryRegional);
      }

      entryRegional.selectedForms += selection.length;
      if (selection.length === allSelection.length) {
        entryRegional.selectedPokemon++;
      }
      entryRegional.allPokemon++;
      entryRegional.allForms += allSelection.length;
    });

    this._allSelectionSubjects.refresh(allStatistics);
    POKE_REGIONS.forEach((region: PokeRegion) => {
      const regionalSubjects = this._regionalSelectionSubjects.get(region);
      const regionStatistics = regionalStatistics.get(region);
      if (regionalSubjects && regionStatistics) {
        regionalSubjects.refresh(regionStatistics);
      }
    });
  }
}
