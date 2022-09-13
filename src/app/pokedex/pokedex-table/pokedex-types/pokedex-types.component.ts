import { Component, Input } from '@angular/core';
import { PokeType } from 'src/app/enums';

@Component({
  selector: 'app-pokedex-types',
  templateUrl: './pokedex-types.component.html',
  styleUrls: ['./pokedex-types.component.scss'],
})
export class PokedexTypesComponent {
  @Input() types: PokeType[] = [];

  public getFormatType(type: PokeType) {
    return PokeType[type];
  }
}
