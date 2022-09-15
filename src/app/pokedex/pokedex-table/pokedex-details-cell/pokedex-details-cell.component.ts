import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokeType } from 'src/app/enums';
import { PokedexTableEntry, PokedexTableVariant } from 'src/app/models';
import { PokedexDetailsComponent } from './pokedex-details/pokedex-details.component';

@Component({
  selector: 'pokedex-details-cell',
  templateUrl: './pokedex-details-cell.component.html',
  styleUrls: ['./pokedex-details-cell.component.scss'],
})
export class PokedexDetailsCellComponent {
  @Input() entry!: PokedexTableEntry;
  @Input() variant?: PokedexTableVariant;

  constructor(private dialog: MatDialog) {}

  get types(): PokeType[] {
    return this.entry.types;
  }

  public openDetails() {
    this.dialog.open(PokedexDetailsComponent, {
      width: '90vw',
      data: { entry: this.entry, variant: this.variant },
    });
  }
}
