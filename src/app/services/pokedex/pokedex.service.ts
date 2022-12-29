import { Injectable } from '@angular/core';
import { filter, map, merge, Observable } from 'rxjs';
import { PokedexBaseService } from 'src/app/common';
import { PokedexOptionsService } from '../pokedex-options/pokedex-options.service';
import { PokedexSelectionService } from '../pokedex-selection/pokedex-selection.service';
import { PokedexStatisticsService } from '../pokedex-statistics/pokedex-statistics.service';
import { PokedexUiServiceService } from '../pokedex-ui-service/pokedex-ui-service.service';
import { EntryForStatistics } from 'src/app/models';
import { calcNewSelection, getAllSelections } from 'src/app/utils';
import { PokedexDataService } from '../pokedex-data/pokedex-data.service';

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
        this.pokedexUiServiceService.windowSizeObservable.subscribe(() =>
          this.pokedexOptionsService.changeTableColumns()
        );

        this.initialize();
        this.setAsReady();
      },
    });
  }

  private initialize(): void {
    this.pokedexSelectionService.selectionChange$
      .pipe(filter(({ userInput }) => userInput))
      .subscribe(({ entry, newSelection, oldSelection }) => {
        this.pokedexStatisticsService.refreshPerEntry(
          entry,
          newSelection,
          oldSelection,
          getAllSelections(entry)
        );
      });

    this.pokedexOptionsService.optionsObservable.subscribe(async () => {
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

  private getTableEntriesForStatistics(): Observable<{
    data: EntryForStatistics[];
    count: number;
  }> {
    return this.pokedexDataService.getTableEntries().pipe(
      map(({ data, count }) => {
        return {
          count,
          data: data.map((entry) => {
            return {
              entry,
              selection: this.pokedexSelectionService.getSelection(
                entry.number
              ),
              allSelection: getAllSelections(entry),
            };
          }),
        };
      })
    );
  }
}
