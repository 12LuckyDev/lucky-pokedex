import { Component, Input } from '@angular/core';
import { PokeFormType, PokeGender } from 'src/app/enums';
import { PokedexFormEntry, PokedexRegionalFormEntry } from 'src/app/models';
import {
  PokedexOptionsService,
  PokedexSelectionService,
} from 'src/app/services';
import { PokedexBaseComponent } from '../pokedex-base-component/pokedex-base.component';

const getGenderName = (gender: PokeGender) => {
  return PokeGender[gender];
};

@Component({
  selector: 'app-poke-selection-check',
  templateUrl: './poke-selection-check.component.html',
  styleUrls: ['./poke-selection-check.component.scss'],
})
export class PokeSelectionCheckComponent extends PokedexBaseComponent {
  @Input() selectionType: PokeFormType | null = null;
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
      case PokeFormType.form:
      case PokeFormType.regional_form:
        return this.form?.imgPath ?? '';
      default:
        const genderDiffs = this.entry?.genderDiffs;
        return gender === PokeGender.female && genderDiffs
          ? genderDiffs.femaleImgPath
          : this.number ?? '';
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
        case PokeFormType.form:
          return this.form
            ? this.pokedexSelectionService.isFormSelected(
                this.number,
                (this.form as PokedexFormEntry).id,
                gender
              )
            : false;
        case PokeFormType.regional_form:
          return this.form
            ? this.pokedexSelectionService.isRegionalFormSelected(
                this.number,
                (this.form as PokedexRegionalFormEntry).region,
                gender
              )
            : false;
        default:
          return this.pokedexSelectionService.isSelected(this.number, gender);
      }
    }
    return false;
  }

  changeSelection(gender?: PokeGender): void {
    switch (this.selectionType) {
      case PokeFormType.form:
        if (this.form) {
          this.pokedexSelectionService.changeFormSelection(
            this.number,
            (this.form as PokedexFormEntry).id,
            gender
          );
        }
        break;
      case PokeFormType.regional_form:
        if (this.form) {
          this.pokedexSelectionService.changeRegionalFormSelection(
            this.number,
            (this.form as PokedexRegionalFormEntry).region,
            gender
          );
        }
        break;
      default:
        this.pokedexSelectionService.changeSelection(this.number, gender);
    }
  }
}
