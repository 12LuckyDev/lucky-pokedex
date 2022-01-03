import { Component, Input } from '@angular/core';

const IMG_URL_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const IMG_URL_EXTENSION = '.png';

@Component({
  selector: 'poke-img',
  templateUrl: './poke-img.component.html',
  styleUrls: ['./poke-img.component.scss'],
})
export class PokeImgComponent {
  constructor() {}

  @Input() imgPath: string | number = '';

  get url() {
    return `${IMG_URL_BASE}${this.imgPath}${IMG_URL_EXTENSION}`;
  }

  get alt() {
    return this.imgPath;
  }
}
