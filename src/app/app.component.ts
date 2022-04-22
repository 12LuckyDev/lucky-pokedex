import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { PokedexOptionsService, PokedexSelectionService } from './services';

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
  };

  constructor(
    private pokedexOptionsService: PokedexOptionsService,
    private pokedexSelectionService: PokedexSelectionService
  ) {}

  ngOnInit(): void {
    this.pokedexOptionsService.readyObservable
      .pipe(filter((ready) => ready))
      .subscribe((ready) => (this._ready.options = ready));

    this.pokedexSelectionService.readyObservable
      .pipe(filter((ready) => ready))
      .subscribe((ready) => (this._ready.selection = ready));
  }

  get ready(): boolean {
    return this._ready.options && this._ready.selection;
  }
}
