import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokedexSearch, PokemonSearchModel } from 'src/app/models';
import { PokedexFilters } from 'src/app/models/app-logic/pokedex-filters.model';

@Injectable({
  providedIn: 'root',
})
export class PokedexSearchService {
  private _searchSubject = new BehaviorSubject<PokedexSearch>(
    new PokemonSearchModel()
  );

  constructor() {}

  public get searchObservable(): Observable<PokedexSearch> {
    return this._searchSubject.asObservable();
  }

  public get search(): PokedexSearch {
    return this._searchSubject.value;
  }

  public changeTextSearch(textSearch: string) {
    this._searchSubject.next({ ...this.search, textSearch });
  }

  public changeFilters(filters: PokedexFilters) {
    this._searchSubject.next({ ...this.search, filters });
  }
}
