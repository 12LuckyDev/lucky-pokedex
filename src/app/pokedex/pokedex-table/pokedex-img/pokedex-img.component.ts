import { Component, Input } from '@angular/core';

const IMG_URL_BASE =
  'https://raw.githubusercontent.com/12pokelucky/poke-data/main/img_96/';

@Component({
  selector: 'pokedex-img',
  templateUrl: './pokedex-img.component.html',
  styleUrls: ['./pokedex-img.component.scss'],
})
export class PokedexImgComponent {
  constructor() {}

  @Input() imgPath: string | number = '';

  get url() {
    return `${IMG_URL_BASE}${this.imgPath}`;
  }

  get alt() {
    return this.imgPath;
  }
}
