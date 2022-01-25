import { Component, Input } from '@angular/core';
import { PokedexEntry } from 'src/app/models';

@Component({
  selector: 'app-poke-entry-details',
  templateUrl: './poke-entry-details.component.html',
  styleUrls: ['./poke-entry-details.component.scss'],
})
export class PokeEntryDetailsComponent {
  @Input() entry!: PokedexEntry;

  constructor() {}

  get forms() {
    return this.entry ? this.entry.forms : null;
  }

  get regionalForms() {
    return this.entry ? this.entry.regionalForms : null;
  }
}
