import { Injectable, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable, skip } from 'rxjs';
import { PokedexBaseService } from 'src/app/common';
import { PokedexUiSettings } from 'src/app/models';
import { calcWindowSize } from 'src/app/utils';
import { PokedexStorageService } from '../pokedex-storage/pokedex-storage.service';

const DEFAULT_OPTIONS: PokedexUiSettings = {
  optionsAreOpen: true,
};

@Injectable({
  providedIn: 'root',
})
export class PokedexUiServiceService extends PokedexBaseService {
  private _windowSizeSubject: BehaviorSubject<'big' | 'mobile'> =
    new BehaviorSubject<'big' | 'mobile'>(calcWindowSize());

  private _uiSettings: PokedexUiSettings = DEFAULT_OPTIONS;

  constructor(
    private pokedexStorageService: PokedexStorageService,
    private rendererFactory2: RendererFactory2
  ) {
    super();
    this.rendererFactory2
      .createRenderer(null, null)
      .listen('window', 'resize', () => {
        const windowsSize = calcWindowSize();
        if (windowsSize !== this._windowSizeSubject.value) {
          this._windowSizeSubject.next(calcWindowSize());
        }
      });

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

  private setUiSeetings(settings: PokedexUiSettings) {
    this._uiSettings = settings;
    this.pokedexStorageService.setUiSettings(settings).subscribe();
  }

  public get windowSizeObservable(): Observable<'big' | 'mobile'> {
    return this._windowSizeSubject.asObservable().pipe(skip(1));
  }
}
