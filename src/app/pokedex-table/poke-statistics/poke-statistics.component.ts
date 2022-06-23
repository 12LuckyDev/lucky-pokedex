import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { SelectionStatistics } from 'src/app/models';
import { PokedexOptionsService, PokedexService } from 'src/app/services';
import { DestroyedAwareComponent } from '../pokedex-base-component/destroyed-aware.component';

@Component({
  selector: 'app-poke-statistics',
  templateUrl: './poke-statistics.component.html',
  styleUrls: ['./poke-statistics.component.scss'],
})
export class PokeStatisticsComponent
  extends DestroyedAwareComponent
  implements OnInit
{
  private _statistics!: SelectionStatistics;

  constructor(
    private pokedexService: PokedexService,
    private pokedexOptionsService: PokedexOptionsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.pokedexService.selectionStatisticsObservable
      .pipe(takeUntil(this.destroyed))
      .subscribe((statistics) => (this._statistics = statistics));
  }

  public get showFormsStatistics() {
    return this.pokedexOptionsService.showFormsStatistics;
  }

  public get allPokemon(): number {
    return this._statistics?.allPokemon ?? 0;
  }

  public get allForms(): number {
    return this._statistics?.allForms ?? 0;
  }

  public get selectedPokemon(): number {
    return this._statistics?.selectedPokemon ?? 0;
  }

  public get selectedForms(): number {
    return this._statistics?.selectedForms ?? 0;
  }

  public get selectedPokemonValue(): number {
    return this._statistics
      ? (this._statistics.selectedPokemon / this._statistics.allPokemon) * 100
      : 0;
  }

  public get selectedFormsValue(): number {
    return this._statistics
      ? (this._statistics.selectedForms / this._statistics.allForms) * 100
      : 0;
  }
}
