import { Component, Input } from '@angular/core';
import { PokeType } from 'src/app/enums';
import { formatType } from 'src/app/utils';

@Component({
  selector: 'pokedex-type',
  templateUrl: './pokedex-type.component.html',
  styleUrls: ['./pokedex-type.component.scss'],
})
export class PokedexTypeComponent {
  @Input() type: PokeType | null = null;

  public get formatedType(): string {
    return typeof this.type === 'number' ? formatType(this.type) : '';
  }
}
