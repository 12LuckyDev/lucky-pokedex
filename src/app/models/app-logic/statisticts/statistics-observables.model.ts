import { Observable } from 'rxjs';

export interface StatisticsObservables {
  allCount: Observable<{ allPokemon: number; allForms: number }>;
  selectedPokemon: Observable<number>;
  selectedForms: Observable<number>;
}
