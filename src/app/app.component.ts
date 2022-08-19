import { Component, OnInit } from '@angular/core';
import { PokedexService } from './services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lucky-pokedex';
  private _ready = false;

  constructor(
    private translate: TranslateService,
    private pokedexService: PokedexService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit(): void {
    this.pokedexService.readyObservable.subscribe({
      complete: () => (this._ready = true),
    });
  }

  get ready(): boolean {
    return this._ready;
  }
}
