import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import {
  PokedexOptionsService,
  PokedexSelectionService,
  PokedexUiServiceService,
} from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lucky-pokedex';
  private _ready = {
    options: false,
    selection: false,
    uiSettings: false,
  };

  constructor(
    private pokedexOptionsService: PokedexOptionsService,
    private pokedexSelectionService: PokedexSelectionService,
    private pokedexUiServiceService: PokedexUiServiceService
  ) {}

  ngOnInit(): void {
    this.pokedexOptionsService.readyObservable
      .pipe(filter((ready) => ready))
      .subscribe((ready) => (this._ready.options = ready));

    this.pokedexSelectionService.readyObservable
      .pipe(filter((ready) => ready))
      .subscribe((ready) => (this._ready.selection = ready));

    this.pokedexUiServiceService.readyObservable
      .pipe(filter((ready) => ready))
      .subscribe((ready) => (this._ready.uiSettings = ready));
  }

  get ready(): boolean {
    const { options, selection, uiSettings } = this._ready;
    return options && selection && uiSettings;
  }
}
