import { Component } from '@angular/core';
import { StatisticsObservables } from 'src/app/models';
import { PokedexStatisticsService } from 'src/app/services';
import { MatDialog } from '@angular/material/dialog';
import { PokeDetailedStatisticsComponent } from './poke-detailed-statistics/poke-detailed-statistics.component';

@Component({
  selector: 'app-poke-statistics',
  templateUrl: './poke-statistics.component.html',
  styleUrls: ['./poke-statistics.component.scss'],
})
export class PokeStatisticsComponent {
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
    this.dialog.open(PokeDetailedStatisticsComponent, {
      width: '90vw',
    });
  }
}
