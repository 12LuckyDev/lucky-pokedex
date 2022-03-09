import { Component, Input } from '@angular/core';
import { PokeGender } from 'src/app/enums';
import { PokedexFormEntry, PokedexRegionalFormEntry } from 'src/app/models';
import {
  PokedexOptionsService,
  PokedexSelectionService,
} from 'src/app/services';
import { PokedexBaseComponent } from '../pokedex-base-component/pokedex-base.component';

export enum SelectionType {
  POKEMON = 'POKEMON',
  POKEMON_FORM = 'POKEMON_FORM',
  POKEMON_REGIONAL_FORM = 'POKEMON_REGIONAL_FORM',
}

const getGenderName = (gender: PokeGender) => {
  return PokeGender[gender];
};

@Component({
  selector: 'app-poke-selection-check',
  templateUrl: './poke-selection-check.component.html',
  styleUrls: ['./poke-selection-check.component.scss'],
})
export class PokeSelectionCheckComponent extends PokedexBaseComponent {
  @Input() selectionType: SelectionType = SelectionType.POKEMON;
  @Input() form!: PokedexRegionalFormEntry | PokedexFormEntry;

  constructor(
    private pokedexSelectionService: PokedexSelectionService,
    private pokedexOptionsService: PokedexOptionsService
  ) {
    super();
  }

  get showGender(): boolean {
    return this.pokedexOptionsService.getShowGender(
      this.entry,
      this.selectionType
    );
  }

  get genders(): PokeGender[] {
    return this.entry ? this.entry.genders : [];
  }

  getImgPath(gender?: PokeGender): string | number {
    switch (this.selectionType) {
      case SelectionType.POKEMON:
        const genderDiffs = this.entry?.genderDiffs;
        return gender === PokeGender.female && genderDiffs
          ? genderDiffs.femaleImgPath
          : this.number ?? '';
      case SelectionType.POKEMON_FORM:
      case SelectionType.POKEMON_REGIONAL_FORM:
        return this.form?.imgPath ?? '';
    }
  }

  getGenderName(gender: PokeGender): string {
    return gender !== null || gender !== undefined ? getGenderName(gender) : '';
  }

  showIcon(gender: PokeGender) {
    return gender !== PokeGender.genderless;
  }

  isSelected(gender?: PokeGender): boolean {
    if (this.number) {
      switch (this.selectionType) {
        case SelectionType.POKEMON:
          return this.pokedexSelectionService.isSelected(this.number, gender);
        case SelectionType.POKEMON_FORM:
          return this.form
            ? this.pokedexSelectionService.isFormSelected(
                this.number,
                (this.form as PokedexFormEntry).id,
                gender
              )
            : false;
        case SelectionType.POKEMON_REGIONAL_FORM:
          return this.form
            ? this.pokedexSelectionService.isRegionalFormSelected(
                this.number,
                (this.form as PokedexRegionalFormEntry).region,
                gender
              )
            : false;
      }
    }
    return false;
  }

  changeSelection(gender?: PokeGender): void {
    switch (this.selectionType) {
      case SelectionType.POKEMON:
        this.pokedexSelectionService.changeSelection(this.number, gender);
        break;
      case SelectionType.POKEMON_FORM:
        if (this.form) {
          this.pokedexSelectionService.changeFormSelection(
            this.number,
            (this.form as PokedexFormEntry).id,
            gender
          );
        }
        break;
      case SelectionType.POKEMON_REGIONAL_FORM:
        if (this.form) {
          this.pokedexSelectionService.changeRegionalFormSelection(
            this.number,
            (this.form as PokedexRegionalFormEntry).region,
            gender
          );
        }
        break;
    }
  }
}
