import { Component } from '@angular/core';
import { StatisticsObservables } from 'src/app/models';
import {
  PokedexDialogService,
  PokedexStatisticsService,
} from 'src/app/services';
import { PokedexDetailedStatisticsComponent } from './pokedex-detailed-statistics/pokedex-detailed-statistics.component';
import { DestroyedAwareComponent } from 'src/app/common';

@Component({
  selector: 'pokedex-statistics',
  templateUrl: './pokedex-statistics.component.html',
  styleUrls: ['./pokedex-statistics.component.scss'],
})
export class PokedexStatisticsComponent extends DestroyedAwareComponent {
  private _allSelectionObservables: StatisticsObservables;

  constructor(
    private pokedexStatisticsService: PokedexStatisticsService,
    private pokedexDialogService: PokedexDialogService
  ) {
    super();
    this._allSelectionObservables =
      this.pokedexStatisticsService.allSelectionObservables;
  }

  public get allSelectionObservables() {
    return this._allSelectionObservables;
  }

  public openDetailed() {
    this.pokedexDialogService.open(
      PokedexDetailedStatisticsComponent,
      null,
      this.destroyed
    );
  }
}
