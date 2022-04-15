import { Component, Input } from '@angular/core';
import { PokeFormType, PokeGender } from 'src/app/enums';
import { PokedexTableForm } from 'src/app/models';
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
  @Input() form!: PokedexTableForm;

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

  get selectionType(): PokeFormType | null {
    return this.form ? this.form.formType : null;
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
    return this.pokedexSelectionService.isSelected(
      this.number,
      this.form,
      gender
    );
  }

  changeSelection(gender?: PokeGender): void {
    this.pokedexSelectionService.changeSelection(
      this.number,
      this.form,
      gender
    );
  }
}
