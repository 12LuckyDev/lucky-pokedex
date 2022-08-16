import { Component, Input } from '@angular/core';

const IMG_URL_BASE =
  'https://raw.githubusercontent.com/12pokelucky/poke-data/main/img_96/';

@Component({
  selector: 'poke-img',
  templateUrl: './poke-img.component.html',
  styleUrls: ['./poke-img.component.scss'],
})
export class PokeImgComponent {
  constructor() {}

  @Input() imgPath: string | number = '';

  get url() {
    return `${IMG_URL_BASE}${this.imgPath}`;
  }

  get alt() {
    return this.imgPath;
  }
}
