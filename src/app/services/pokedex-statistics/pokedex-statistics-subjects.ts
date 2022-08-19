import { BehaviorSubject } from 'rxjs';
import { SelectionStatistics, StatisticsObservables } from 'src/app/models';

export class StatisticsSubjects {
  private _allCountSubject: BehaviorSubject<{
    allPokemon: number;
    allForms: number;
  }>;
  private _selectedPokemonSubject: BehaviorSubject<number>;
  private _selectedFormsSubject: BehaviorSubject<number>;

  constructor() {
    this._allCountSubject = new BehaviorSubject<{
      allPokemon: number;
      allForms: number;
    }>({
      allPokemon: 0,
      allForms: 0,
    });
    this._selectedPokemonSubject = new BehaviorSubject<number>(0);
    this._selectedFormsSubject = new BehaviorSubject<number>(0);
  }

  public get selectedPokemon() {
    return this._selectedPokemonSubject.value;
  }

  public get selectedForms() {
    return this._selectedFormsSubject.value;
  }

  public get observables(): StatisticsObservables {
    return {
      allCount: this._allCountSubject.asObservable(),
      selectedPokemon: this._selectedPokemonSubject.asObservable(),
      selectedForms: this._selectedFormsSubject.asObservable(),
    };
  }

  public refresh({
    allPokemon,
    allForms,
    selectedPokemon,
    selectedForms,
  }: SelectionStatistics) {
    this._allCountSubject.next({ allPokemon, allForms });
    this._selectedPokemonSubject.next(selectedPokemon);
    this._selectedFormsSubject.next(selectedForms);
  }

  public refreshSelected(selectedPokemon: number, selectedForms: number) {
    if (this._selectedPokemonSubject.value !== selectedPokemon) {
      this._selectedPokemonSubject.next(selectedPokemon);
    }
    if (this._selectedFormsSubject.value !== selectedForms) {
      this._selectedFormsSubject.next(selectedForms);
    }
  }
}
