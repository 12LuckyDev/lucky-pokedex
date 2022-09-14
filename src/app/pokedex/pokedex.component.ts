import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../services';

@Component({
  selector: 'pokedex',
  templateUrl: './pokedex.component.html',
})
export class PokedexComponent implements OnInit {
  private _ready = false;

  constructor(private pokedexService: PokedexService) {}

  ngOnInit(): void {
    this.pokedexService.readyObservable.subscribe({
      complete: () => (this._ready = true),
    });
  }

  get ready(): boolean {
    return this._ready;
  }
}
