import { Component, Input } from '@angular/core';
import { PokedexEntry } from 'src/app/models';
import { PokedexOptionsService } from 'src/app/services';

@Component({
  selector: 'app-poke-entry-details',
  templateUrl: './poke-entry-details.component.html',
  styleUrls: ['./poke-entry-details.component.scss'],
})
export class PokeEntryDetailsComponent {
  @Input() entry!: PokedexEntry;

  constructor(private pokedexOptionsService: PokedexOptionsService) {}

  get showForm(): boolean {
    return this.pokedexOptionsService.getShowForms(this.entry);
  }

  get showRegionalForms() {
    return this.entry
      ? this.entry.regionalForms
        ? this.entry.regionalForms.length > 0
        : false
      : false;
  }
}
