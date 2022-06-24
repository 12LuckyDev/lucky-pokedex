import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, merge, Observable } from 'rxjs';
import { PokedexBaseService } from 'src/app/base';
import {
  PokedexEntry,
  SelectionStatistics,
  SpecyficSelection,
} from 'src/app/models';
import { PokedexDataService } from '../pokedex-data/pokedex-data.service';
import { PokedexOptionsService } from '../pokedex-options/pokedex-options.service';
import { getAllSelections } from '../pokedex-selection/pokedex-selection-utils';
import { PokedexSelectionService } from '../pokedex-selection/pokedex-selection.service';
import { PokedexUiServiceService } from '../pokedex-ui-service/pokedex-ui-service.service';

@Injectable({
  providedIn: 'root',
})
export class PokedexService extends PokedexBaseService {
  private _subservicesReady = {
    options: false,
    selection: false,
    uiSettings: false,
  };

  private _selectionStatisticsSubject =
    new BehaviorSubject<SelectionStatistics>({
      allPokemon: 0,
      allForms: 0,
      selectedPokemon: 0,
      selectedForms: 0,
    });

  constructor(
    private pokedexOptionsService: PokedexOptionsService,
    private pokedexSelectionService: PokedexSelectionService,
    private pokedexUiServiceService: PokedexUiServiceService,
    private pokedexDataService: PokedexDataService
  ) {
    super();

    merge(
      this.pokedexOptionsService.readyObservable,
      this.pokedexSelectionService.readyObservable,
      this.pokedexUiServiceService.readyObservable
    )
      .pipe(filter(({ ready }) => !!ready))
      .subscribe(({ ready, name }) => {
        this._subservicesReady[name as 'options' | 'selection' | 'uiSettings'] =
          ready;
        if (this.allReady) {
          this.refreshStatistics();
          this.initialize();
          this.setAsReady();
        }
      });
  }

  protected get serviceName(): string {
    return 'pokedex';
  }

  private get allReady(): boolean {
    const { options, selection, uiSettings } = this._subservicesReady;
    return options && selection && uiSettings;
  }

  private get selectionStatistics(): SelectionStatistics {
    return this._selectionStatisticsSubject.value;
  }

  public get selectionStatisticsObservable(): Observable<SelectionStatistics> {
    return this._selectionStatisticsSubject.asObservable();
  }

  private initialize(): void {
    this.pokedexSelectionService.selectionChangeObservable
      .pipe(filter(({ userInput }) => userInput))
      .subscribe(({ entry, newSelection, oldSelection }) => {
        const { selectedForms, selectedPokemon, ...rest } =
          this.selectionStatistics;
        let newSelectedPokemon = selectedPokemon;

        const allFormSelectionCount = this.getAllFormSelections(entry).length;
        if (allFormSelectionCount === oldSelection.length) {
          --newSelectedPokemon;
        }
        if (allFormSelectionCount === newSelection.length) {
          ++newSelectedPokemon;
        }

        this._selectionStatisticsSubject.next({
          ...rest,
          selectedForms:
            selectedForms - oldSelection.length + newSelection.length,
          selectedPokemon: newSelectedPokemon,
        });
        console.log(this.selectionStatistics);
      });

    this.pokedexOptionsService.getOptionsObservable().subscribe((options) => {
      console.log('POKEDEX SERVICE', options);
      //TODO clear unneeded selection entries
      this.pokedexDataService.getPokedexList().subscribe(({ data }) => {
        data.forEach((entry) => {
          const selection = this.pokedexSelectionService.getSelection(
            entry.number
          );
          if (selection.length > 0) {
            const allSelected = this.getAllFormSelections(entry);
            const newSelection: SpecyficSelection[] = [];

            //TODO continue here
            console.log('OPTION CHANGE', selection, allSelected, newSelection);
            this.pokedexSelectionService.updateSelection(
              entry,
              newSelection,
              false
            );
          }
        });
      });
      this.refreshStatistics();
    });
  }

  private getAllFormSelections(entry: PokedexEntry): SpecyficSelection[] {
    return getAllSelections(
      entry,
      this.pokedexOptionsService.getShowTypes(entry)
    );
  }

  public isAllSelected(entry?: PokedexEntry): boolean {
    return entry
      ? this.pokedexSelectionService.getSelection(entry.number).length ===
          this.getAllFormSelections(entry).length
      : false;
  }

  public isSomeSelected(entry?: PokedexEntry): boolean {
    return entry
      ? this.pokedexSelectionService.getSelection(entry.number).length > 0
      : false;
  }

  public selectAll(entry?: PokedexEntry): void {
    if (entry) {
      this.pokedexSelectionService.updateSelection(
        entry,
        this.getAllFormSelections(entry)
      );
    }
  }

  public deselectAll(entry?: PokedexEntry): void {
    if (entry) {
      this.pokedexSelectionService.updateSelection(entry, []);
    }
  }

  private refreshStatistics(): void {
    this.pokedexDataService.getPokedexList().subscribe(({ data, count }) => {
      let selectedPokemon = 0;
      let allForms = 0;
      let selectedForms = 0;

      data.forEach((entry: PokedexEntry) => {
        const selection = this.pokedexSelectionService.getSelection(
          entry.number
        );
        selectedForms += selection.length;
        if (selection.length === this.getAllFormSelections(entry).length) {
          selectedPokemon++;
        }

        allForms += this.getAllFormSelections(entry).length;
      });

      this._selectionStatisticsSubject.next({
        allPokemon: count,
        allForms,
        selectedForms,
        selectedPokemon,
      });
    });
  }
}
