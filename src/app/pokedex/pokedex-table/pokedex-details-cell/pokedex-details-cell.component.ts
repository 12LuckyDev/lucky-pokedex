import { Component, Input } from '@angular/core';
import { PokeType } from 'src/app/enums';
import { PokedexEntry, PokedexTableVariant } from 'src/app/models';
import { PokedexDetailsComponent } from './pokedex-details/pokedex-details.component';
import { PokedexDialogService } from 'src/app/services';
import { DestroyedAwareComponent } from 'src/app/common';

@Component({
  selector: 'pokedex-details-cell',
  templateUrl: './pokedex-details-cell.component.html',
  styleUrls: ['./pokedex-details-cell.component.scss'],
})
export class PokedexDetailsCellComponent extends DestroyedAwareComponent {
  @Input() entry!: PokedexEntry;
  @Input() variant!: PokedexTableVariant;

  constructor(private pokedexDialogService: PokedexDialogService) {
    super();
  }

  get types(): PokeType[] {
    return this.variant.types;
  }

  public openDetails() {
    this.pokedexDialogService.open(
      PokedexDetailsComponent,
      {
        entry: this.entry,
        variant: this.variant,
      },
      this.destroyed
    );
  }
}
