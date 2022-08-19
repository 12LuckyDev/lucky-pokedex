import { Component } from '@angular/core';
import { PokeRegion } from 'src/app/enums';
import { StatisticsObservables } from 'src/app/models';
import { PokedexStatisticsService } from 'src/app/services';
import { formatRegion } from 'src/app/utils';

@Component({
  selector: 'app-poke-detailed-statistics',
  templateUrl: './poke-detailed-statistics.component.html',
  styleUrls: ['./poke-detailed-statistics.component.scss'],
})
export class PokeDetailedStatisticsComponent {
  private _regionalObservables: {
    region: PokeRegion;
    observables: StatisticsObservables;
  }[];

  constructor(private pokedexStatisticsService: PokedexStatisticsService) {
    this._regionalObservables =
      this.pokedexStatisticsService.regionalObservables;
  }

  public get regionalObservables() {
    return this._regionalObservables;
  }

  public formatRegion(region: PokeRegion): string {
    return formatRegion(region);
  }
}
