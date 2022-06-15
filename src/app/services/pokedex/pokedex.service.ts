import { Injectable } from '@angular/core';
import { filter, merge } from 'rxjs';
import { PokedexBaseService } from 'src/app/base';
import { PokedexOptionsService } from '../pokedex-options/pokedex-options.service';
import { PokedexSelectionService } from '../pokedex-selection/pokedex-selection.service';
import { PokedexUiServiceService } from '../pokedex-ui-service/pokedex-ui-service.service';

@Injectable({
  providedIn: 'root',
})
export class PokedexService extends PokedexBaseService {
  private _subservicesReady = {
    options: false,
    selection: false,
    uiSettings: false,
  };

  constructor(
    private pokedexOptionsService: PokedexOptionsService,
    private pokedexSelectionService: PokedexSelectionService,
    private pokedexUiServiceService: PokedexUiServiceService
  ) {
    super();
    merge(
      this.pokedexOptionsService.readyObservable,
      this.pokedexSelectionService.readyObservable,
      this.pokedexUiServiceService.readyObservable
    )
      .pipe(filter(({ ready }) => !!ready))
      .subscribe(({ ready, name }) => {
        this._subservicesReady[name as 'options' | 'selection' | 'uiSettings'] =
          ready;
        this.checkIfReady();
      });
  }

  protected get serviceName(): string {
    return 'pokedex';
  }

  private get allReady(): boolean {
    const { options, selection, uiSettings } = this._subservicesReady;
    return options && selection && uiSettings;
  }

  private checkIfReady(): void {
    if (this.allReady) {
      this.setAsReady();
    }
  }
}
