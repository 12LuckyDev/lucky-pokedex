import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StatisticsObservables } from 'src/app/models';
import { PokedexOptionsService } from 'src/app/services';

@Component({
  selector: 'pokedex-statistics-bars',
  templateUrl: './pokedex-statistics-bars.component.html',
  styleUrls: ['./pokedex-statistics-bars.component.scss'],
})
export class PokedexStatisticsBarsComponent implements OnInit, OnDestroy {
  private _allPokemon: number = 0;
  private _allForms: number = 0;
  private _selectedPokemon: number = 0;
  private _selectedForms: number = 0;

  protected _subscriptions = new Subscription();

  @Input() observables!: StatisticsObservables;

  constructor(private pokedexOptionsService: PokedexOptionsService) {}

  ngOnInit(): void {
    if (this.observables) {
      this._subscriptions.add(
        this.observables.allCount.subscribe(({ allPokemon, allForms }) => {
          this._allPokemon = allPokemon;
          this._allForms = allForms;
        })
      );
      this._subscriptions.add(
        this.observables.selectedPokemon.subscribe(
          (selectedPokemon) => (this._selectedPokemon = selectedPokemon)
        )
      );
      this._subscriptions.add(
        this.observables.selectedForms.subscribe(
          (selectedForms) => (this._selectedForms = selectedForms)
        )
      );
    }
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  public get showFormsStatistics() {
    return this.pokedexOptionsService.showFormsStatistics;
  }

  public get allPokemon(): number {
    return this._allPokemon;
  }

  public get allForms(): number {
    return this._allForms;
  }

  public get selectedPokemon(): number {
    return this._selectedPokemon;
  }

  public get selectedForms(): number {
    return this._selectedForms;
  }

  public get selectedPokemonValue(): number {
    return (this._selectedPokemon / this._allPokemon) * 100;
  }

  public get selectedFormsValue(): number {
    return (this._selectedForms / this._allForms) * 100;
  }
}
