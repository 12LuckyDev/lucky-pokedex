import { Injectable } from '@angular/core';
import localforage from 'localforage';
import { from, Observable } from 'rxjs';
import {
  PokedexOptions,
  SpecyficSelection,
  PokedexUiSettings,
} from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class PokedexStorageService {
  private generalStorage: LocalForage;
  private selectionStorage: LocalForage;

  constructor() {
    this.generalStorage = localforage.createInstance({
      name: 'GENERAL',
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
    return this.setItem(this.generalStorage, 'OPTIONS_DATA', options);
  }

  public getOptions(): Observable<PokedexOptions | null> {
    return this.getItem<PokedexOptions>(this.generalStorage, 'OPTIONS_DATA');
  }

  public setUiSettings(
    options: PokedexUiSettings
  ): Observable<PokedexUiSettings> {
    return this.setItem(this.generalStorage, 'UI_SETTINGS_DATA', options);
  }

  public getUiSettings(): Observable<PokedexUiSettings | null> {
    return this.getItem<PokedexUiSettings>(
      this.generalStorage,
      'UI_SETTINGS_DATA'
    );
  }

  public setSelection(
    number: number,
    selection: SpecyficSelection[]
  ): Observable<SpecyficSelection[]> {
    return this.setItem(this.selectionStorage, number.toString(), selection);
  }

  public getAllSelections(): Observable<{
    number: number;
    selection: SpecyficSelection[];
  }> {
    return new Observable<{
      number: number;
      selection: SpecyficSelection[];
    }>((subscriber) => {
      this.selectionStorage
        .iterate<SpecyficSelection[], void>(
          (selection: SpecyficSelection[], key: string) =>
            subscriber.next({ number: +key, selection })
        )
        .then(() => subscriber.complete());
    });
  }
}
