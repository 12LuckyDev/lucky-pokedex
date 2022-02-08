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

  get showForm(): boolean {
    return this.entry
      ? this.entry.forms
        ? this.entry.forms.length > 0
        : false
      : false;
  }

  get showRegionalForms() {
    return this.entry
      ? this.entry.regionalForms
        ? this.entry.regionalForms.length > 0
        : false
      : false;
  }
}
