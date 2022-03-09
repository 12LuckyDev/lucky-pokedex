import { Injectable } from '@angular/core';
import localforage from 'localforage';
import { from, Observable } from 'rxjs';
import { PokedexOptions, PokedexSelection } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class PokedexStorageService {
  private optionsStorage: LocalForage;
  private selectionStorage: LocalForage;

  constructor() {
    this.optionsStorage = localforage.createInstance({
      name: 'OPTIONS',
    });

    this.selectionStorage = localforage.createInstance({
      name: 'SELECTION',
    });
  }

  private setItem<T>(
    storage: LocalForage,
    key: string,
    data: T
  ): Observable<T> {
    return from(storage.setItem(key, data));
  }

  private getItem<T>(storage: LocalForage, key: string): Observable<T | null> {
    return from(storage.getItem<T>(key));
  }

  public setOptions(options: PokedexOptions): Observable<PokedexOptions> {
    return this.setItem(this.optionsStorage, 'OPTIONS_DATA', options);
  }

  public getOptions(): Observable<PokedexOptions | null> {
    return this.getItem<PokedexOptions>(this.optionsStorage, 'OPTIONS_DATA');
  }

  public setSelection(
    number: number,
    selection: PokedexSelection
  ): Observable<PokedexSelection> {
    return this.setItem(this.selectionStorage, number.toString(), selection);
  }

  public getAllSelections(): Observable<{
    number: number;
    selection: PokedexSelection;
  }> {
    return new Observable<{
      number: number;
      selection: PokedexSelection;
    }>((subscriber) => {
      this.selectionStorage
        .iterate<PokedexSelection, void>(
          (selection: PokedexSelection, key: string) =>
            subscriber.next({ number: +key, selection })
        )
        .then(() => subscriber.complete());
    });
  }
}
