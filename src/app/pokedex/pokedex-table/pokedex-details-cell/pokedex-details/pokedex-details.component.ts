import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokeGender, PokeType } from 'src/app/enums';
import { PokedexTableEntry, PokedexTableVariant } from 'src/app/models';
import { formatGender, getImagePath } from 'src/app/utils';

@Component({
  selector: 'pokedex-details',
  templateUrl: './pokedex-details.component.html',
  styleUrls: [
    './pokedex-details.component.scss',
    '../../../../styles/poke-card.scss',
  ],
})
export class PokedexDetailsComponent {
  private entry!: PokedexTableEntry;
  private variant?: PokedexTableVariant;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    data: {
      entry: PokedexTableEntry;
      variant?: PokedexTableVariant;
    }
  ) {
    this.entry = data.entry;
    this.variant = data.variant;
  }

  get name(): string {
    return this.variant ? this.variant.formName : this.entry.name;
  }

  get genders(): PokeGender[] {
    return this.entry.genders;
  }

  get types(): PokeType[] {
    return this.variant ? this.variant.types : this.entry.types;
  }

  public getImagePath(gender?: PokeGender): string {
    return getImagePath(this.entry, { gender, variant: this.variant });
  }

  public getGenderName(gender: PokeGender): string {
    return formatGender(gender);
  }

  public showIcon(gender: PokeGender) {
    return gender !== PokeGender.genderless;
  }
}
