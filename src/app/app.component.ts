import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { PokedexSelectionService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lucky-pokedex';
  private _ready = false;

  constructor(private pokedexSelectionService: PokedexSelectionService) {}

  ngOnInit(): void {
    this.pokedexSelectionService.readyObservable
      .pipe(filter((ready) => ready))
      .subscribe((ready) => (this._ready = ready));
  }

  get ready(): boolean {
    return this._ready;
  }
}
