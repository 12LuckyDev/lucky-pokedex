import { Injectable } from '@angular/core';
import { Observable, skip, Subject } from 'rxjs';
import { PokedexBaseService } from 'src/app/base';
import { PokedexUiSettings } from 'src/app/models';
import { PokedexStorageService } from '../pokedex-storage/pokedex-storage.service';

// TODO continue from here

const DEFAULT_OPTIONS: PokedexUiSettings = {
  optionsAreOpen: true,
};

@Injectable({
  providedIn: 'root',
})
export class PokedexUiServiceService extends PokedexBaseService {
  private _uiSettingsSubject = new Subject<PokedexUiSettings>();
  private _uiSettings: PokedexUiSettings = DEFAULT_OPTIONS;

  constructor(private pokedexStorageService: PokedexStorageService) {
    super();
    this.pokedexStorageService.getUiSettings().subscribe({
      next: (settings) => {
        if (settings) {
          this._uiSettings = settings;
        }
      },
      complete: () => this.setAsReady(),
    });
  }

  public get settings(): PokedexUiSettings {
    return this._uiSettings;
  }

  public get optionsAreOpen() {
    return this._uiSettings.optionsAreOpen;
  }

  public set optionsAreOpen(value: boolean) {
    this.setUiSeetings({ ...this._uiSettings, optionsAreOpen: value });
  }

  public getUiSettingsObservable(
    shipInitialValue: boolean = true
  ): Observable<PokedexUiSettings> {
    return this._uiSettingsSubject
      .asObservable()
      .pipe(skip(shipInitialValue ? 1 : 0));
  }

  private setUiSeetings(settings: PokedexUiSettings) {
    this._uiSettings = settings;
    this.pokedexStorageService.setUiSettings(settings).subscribe();
    this.nextUiSettings(settings);
  }

  private nextUiSettings(settings: PokedexUiSettings) {
    this._uiSettingsSubject.next(settings);
  }
}
