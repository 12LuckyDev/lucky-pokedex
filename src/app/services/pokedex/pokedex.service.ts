import { Injectable } from '@angular/core';
import { filter, map, merge, Observable } from 'rxjs';
import { PokedexBaseService } from 'src/app/common';
import { PokedexOptionsService } from '../pokedex-options/pokedex-options.service';
import { PokedexSelectionService } from '../pokedex-selection/pokedex-selection.service';
import { PokedexStatisticsService } from '../pokedex-statistics/pokedex-statistics.service';
import { PokedexUiServiceService } from '../pokedex-ui-service/pokedex-ui-service.service';
import {
  EntryForStatistics,
  PokedexEntry,
  PokedexTableEntry,
  PokedexTableVariant,
  SpecyficSelection,
} from 'src/app/models';
import {
  calcNewSelection,
  getAllSelections,
  getTableVariantsList,
} from 'src/app/utils';
import {
  GetPokedexListParamsType,
  PokedexDataService,
} from '../pokedex-data/pokedex-data.service';

@Injectable({
  providedIn: 'root',
})
export class PokedexService extends PokedexBaseService {
  constructor(
    private pokedexOptionsService: PokedexOptionsService,
    private pokedexSelectionService: PokedexSelectionService,
    private pokedexUiServiceService: PokedexUiServiceService,
    private pokedexDataService: PokedexDataService,
    private pokedexStatisticsService: PokedexStatisticsService
  ) {
    super();

    merge(
      this.pokedexOptionsService.readyObservable,
      this.pokedexSelectionService.readyObservable,
      this.pokedexUiServiceService.readyObservable
    ).subscribe({
      complete: () => {
        this.getTableEntriesForStatistics().subscribe(({ data, count }) =>
          this.pokedexStatisticsService.refreshStatistics(data, count)
        );
        this.initialize();
        this.setAsReady();
      },
    });
  }

  private initialize(): void {
    this.pokedexSelectionService.selectionChangeObservable
      .pipe(filter(({ userInput }) => userInput))
      .subscribe(({ entry, newSelection, oldSelection }) => {
        this.pokedexStatisticsService.refreshPerEntry(
          entry,
          newSelection,
          oldSelection,
          this.getAllSelections(entry)
        );
      });

    this.pokedexOptionsService.getOptionsObservable().subscribe(() => {
      this.getTableEntriesForStatistics().subscribe(({ data, count }) => {
        data.forEach((el) => {
          if (el.selection.length > 0) {
            el.selection = calcNewSelection(el);

            this.pokedexSelectionService.updateSelection(
              el.entry,
              el.selection,
              false
            );
          }
        });
        this.pokedexStatisticsService.refreshStatistics(data, count);
      });
    });
  }

  private getPokedexTableEntry = (entry: PokedexEntry): PokedexTableEntry => {
    return {
      ...entry,
      showGender: this.pokedexOptionsService.getShowGender(entry),
      showForms: this.pokedexOptionsService.getShowForms(entry),
      hasVariants: this.pokedexOptionsService.getHasVariants(entry),
    };
  };

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
          data: data.map(this.getPokedexTableEntry),
        };
      })
    );
  }

  private getTableEntriesForStatistics(
    requestData: GetPokedexListParamsType = {}
  ): Observable<{
    data: EntryForStatistics[];
    count: number;
  }> {
    return this.pokedexDataService.getPokedexList(requestData).pipe(
      map(({ data, count }) => {
        return {
          count,
          data: data.map((entry) => {
            const tableEntry = this.getPokedexTableEntry(entry);
            return {
              entry: tableEntry,
              selection: this.pokedexSelectionService.getSelection(
                entry.number
              ),
              allSelection: this.getAllSelections(tableEntry),
            };
          }),
        };
      })
    );
  }

  public getTableVariantsList(entry: PokedexEntry): PokedexTableVariant[] {
    return getTableVariantsList(
      entry,
      this.pokedexOptionsService.getShowTypes(entry)
    );
  }

  private getAllSelections(entry: PokedexTableEntry): SpecyficSelection[] {
    return getAllSelections(
      entry,
      this.pokedexOptionsService.getShowTypes(entry)
    );
  }

  public isAllSelected(entry?: PokedexTableEntry): boolean {
    return entry
      ? this.pokedexSelectionService.getSelection(entry.number).length ===
          this.getAllSelections(entry).length
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
        this.getAllSelections(entry)
      );
    }
  }

  public deselectAll(entry?: PokedexTableEntry): void {
    if (entry) {
      this.pokedexSelectionService.updateSelection(entry, []);
    }
  }
}
