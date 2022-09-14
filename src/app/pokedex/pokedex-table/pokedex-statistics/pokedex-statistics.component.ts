import { Component } from '@angular/core';
import { StatisticsObservables } from 'src/app/models';
import { PokedexStatisticsService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { PokedexDetailedStatisticsComponent } from './pokedex-detailed-statistics/pokedex-detailed-statistics.component';

@Component({
  selector: 'pokedex-statistics',
  templateUrl: './pokedex-statistics.component.html',
  styleUrls: ['./pokedex-statistics.component.scss'],
})
export class PokedexStatisticsComponent {
  private _allSelectionObservables: StatisticsObservables;

  constructor(
    private pokedexStatisticsService: PokedexStatisticsService,
    private dialog: MatDialog
  ) {
    this._allSelectionObservables =
      this.pokedexStatisticsService.allSelectionObservables;
  }

  public get allSelectionObservables() {
    return this._allSelectionObservables;
  }

  public openDetailed() {
    this.dialog.open(PokedexDetailedStatisticsComponent, {
      width: '90vw',
    });
  }
}
