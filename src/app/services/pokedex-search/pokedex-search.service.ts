import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokedexSearch } from 'src/app/models';

const DEFAULT_MODEL: PokedexSearch = {
  textSearch: '',
};

@Injectable({
  providedIn: 'root',
})
export class PokedexSearchService {
  private _searchSubject = new BehaviorSubject<PokedexSearch>(DEFAULT_MODEL);

  constructor() {}

  public get searchObservable(): Observable<PokedexSearch> {
    return this._searchSubject.asObservable();
  }

  public get search(): PokedexSearch {
    return this._searchSubject.value;
  }

  public nextSearch(search: PokedexSearch) {
    this._searchSubject.next(search);
  }
}
