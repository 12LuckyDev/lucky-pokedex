import { Component, Input } from '@angular/core';
import { PokeFormType, PokeGender } from 'src/app/enums';
import { PokedexTableForm } from 'src/app/models';
import {
  PokedexOptionsService,
  PokedexSelectionService,
} from 'src/app/services';
import { formatGender } from 'src/app/utils';
import { PokedexBaseComponent } from '../pokedex-base-component/pokedex-base.component';

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

  public get showGender(): boolean {
    return this.pokedexOptionsService.getShowGender(
      this.entry,
      this.selectionType,
      this.form
    );
  }

  public get genders(): PokeGender[] {
    return this.entry ? this.entry.genders : [];
  }

  public get selectionType(): PokeFormType | null {
    return this.form ? this.form.formType : null;
  }

  public getImgPath(gender?: PokeGender): string | number {
    const genderDiffs = this.form
      ? this.form?.genderDiffs
      : this.entry?.genderDiffs;

    switch (this.selectionType) {
      case PokeFormType.form:
      case PokeFormType.regional_form:
        return gender === PokeGender.female && genderDiffs
          ? genderDiffs.femaleImgPath
          : this.form?.imgPath ?? '';
      default:
        return gender === PokeGender.female && genderDiffs
          ? genderDiffs.femaleImgPath
          : this.number ?? '';
    }
  }

  public showCheckbox(): boolean {
    return this.selectionType === null
      ? !this.pokedexOptionsService.getShowForms(this.entry)
      : true;
  }

  public getGenderName(gender: PokeGender): string {
    return gender !== null || gender !== undefined ? formatGender(gender) : '';
  }

  public showIcon(gender: PokeGender) {
    return gender !== PokeGender.genderless;
  }

  public isSelected(gender?: PokeGender): boolean {
    return this.pokedexSelectionService.isSelected(
      this.number,
      this.form,
      gender
    );
  }

  public changeSelection(gender?: PokeGender): void {
    this.pokedexSelectionService.changeSelection(
      this.number,
      this.form,
      gender
    );
  }
}
