import { Component, Input } from '@angular/core';
import { PokeFormType, PokeGender } from 'src/app/enums';
import { PokedexTableForm } from 'src/app/models';
import {
  PokedexOptionsService,
  PokedexSelectionService,
} from 'src/app/services';
import { formatGender, getImagePath } from 'src/app/utils';
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
    return this.form ? this.form.showGender : this.entry.showGender;
  }

  public get genders(): PokeGender[] {
    return this.entry ? this.entry.genders : [];
  }

  public get selectionType(): PokeFormType | null {
    return this.form ? this.form.formType : null;
  }

  public getImagePath(gender?: PokeGender): string {
    return getImagePath(this.entry, { gender, form: this.form });
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
    this.pokedexSelectionService.changeSelection(this.entry, this.form, gender);
  }
}
