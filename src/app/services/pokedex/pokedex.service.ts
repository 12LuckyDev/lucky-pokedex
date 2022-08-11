import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, merge, Observable } from 'rxjs';
import { PokedexBaseService } from 'src/app/base';
import {
  PokedexEntry,
  PokedexTableEntry,
  PokedexTableForm,
  SelectionStatistics,
  SpecyficSelection,
} from 'src/app/models';
import { getAllSelections, getTableFormsList } from 'src/app/utils';
import {
  GetPokedexListParamsType,
  PokedexDataService,
} from '../pokedex-data/pokedex-data.service';
import { PokedexOptionsService } from '../pokedex-options/pokedex-options.service';
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
          this.getTableEntries().subscribe(({ data, count }) =>
            this.refreshStatistics(data, count)
          );
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
      });

    this.pokedexOptionsService.getOptionsObservable().subscribe(() => {
      this.getTableEntries().subscribe(({ data, count }) => {
        data.forEach((entry) => {
          const oldSelection = this.pokedexSelectionService.getSelection(
            entry.number
          );
          if (oldSelection.length > 0) {
            const newSelection: SpecyficSelection[] = [];

            this.getAllFormSelections(entry).forEach((selection) => {
              const { formType, gender, formId } = selection;

              if (
                typeof selection.gender === 'number'
                  ? oldSelection.find(
                      (el) =>
                        el.formType === formType &&
                        el.formId === formId &&
                        el.gender === gender
                    )
                  : oldSelection.find(
                      (el) => el.formType === formType && el.formId === formId
                    )
              ) {
                newSelection.push(selection);
              }
            });

            this.pokedexSelectionService.updateSelection(
              entry,
              newSelection,
              false
            );
          }
        });
        this.refreshStatistics(data, count);
      });
    });
  }

  public getTableEntries(
    requestData: GetPokedexListParamsType = {}
  ): Observable<{
    data: PokedexTableEntry[];
    count: number;
  }> {
    return this.pokedexDataService.getPokedexList(requestData).pipe(
      map(({ data, count }) => {
        return {
          count,
          data: data.map((entry) => ({
            ...entry,
            showGender: this.pokedexOptionsService.getShowGender(entry),
          })),
        };
      })
    );
  }

  public getTableFormsList(entry: PokedexEntry): PokedexTableForm[] {
    return getTableFormsList(
      entry,
      this.pokedexOptionsService.getShowTypes(entry)
    );
  }

  private getAllFormSelections(entry: PokedexTableEntry): SpecyficSelection[] {
    return getAllSelections(
      entry,
      this.pokedexOptionsService.getShowTypes(entry)
    );
  }

  public isAllSelected(entry?: PokedexTableEntry): boolean {
    return entry
      ? this.pokedexSelectionService.getSelection(entry.number).length ===
          this.getAllFormSelections(entry).length
      : false;
  }

  public isSomeSelected(entry?: PokedexTableEntry): boolean {
    return entry
      ? this.pokedexSelectionService.getSelection(entry.number).length > 0
      : false;
  }

  public selectAll(entry?: PokedexTableEntry): void {
    if (entry) {
      this.pokedexSelectionService.updateSelection(
        entry,
        this.getAllFormSelections(entry)
      );
    }
  }

  public deselectAll(entry?: PokedexTableEntry): void {
    if (entry) {
      this.pokedexSelectionService.updateSelection(entry, []);
    }
  }

  private refreshStatistics(data: PokedexTableEntry[], count: number): void {
    const result = {
      allPokemon: count,
      allForms: 0,
      selectedForms: 0,
      selectedPokemon: 0,
    };

    data.forEach((entry: PokedexTableEntry) => {
      const selection = this.pokedexSelectionService.getSelection(entry.number);
      result.selectedForms += selection.length;
      if (selection.length === this.getAllFormSelections(entry).length) {
        result.selectedPokemon++;
      }

      result.allForms += this.getAllFormSelections(entry).length;
    });

    this._selectionStatisticsSubject.next(result);
  }
}
