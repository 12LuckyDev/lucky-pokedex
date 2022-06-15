import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { PokedexService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lucky-pokedex';
  private _ready = false;

  constructor(private pokedexService: PokedexService) {}

  ngOnInit(): void {
    this.pokedexService.readyObservable
      .pipe(filter(({ ready }) => !!ready))
      .subscribe(() => {
        this._ready = true;
      });
  }

  get ready(): boolean {
    return this._ready;
  }
}
