import { Component, Input } from '@angular/core';
import { PokeVariantType, PokeGender } from 'src/app/enums';
import { PokedexTableVariant } from 'src/app/models';
import { PokedexSelectionService } from 'src/app/services';
import { formatGender, getImagePath } from 'src/app/utils';
import { PokedexBaseComponent } from '../../../common/components/pokedex-base.component';

@Component({
  selector: 'app-poke-selection-check',
  templateUrl: './poke-selection-check.component.html',
  styleUrls: ['./poke-selection-check.component.scss'],
})
export class PokeSelectionCheckComponent extends PokedexBaseComponent {
  @Input() form!: PokedexTableVariant;

  constructor(private pokedexSelectionService: PokedexSelectionService) {
    super();
  }

  public get showGender(): boolean {
    return this.form ? this.form.showGender : this.entry.showGender;
  }

  public get genders(): PokeGender[] {
    return this.entry ? this.entry.genders : [];
  }

  public get selectionType(): PokeVariantType | null {
    return this.form ? this.form.formType : null;
  }

  public getImagePath(gender?: PokeGender): string {
    return getImagePath(this.entry, { gender, form: this.form });
  }

  public get showCheckbox(): boolean {
    return this.selectionType === null ? !this.entry.showForms : true;
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

  public onCardClick(event: MouseEvent, gender?: PokeGender) {
    event.stopPropagation();
    if (this.showCheckbox) {
      this.changeSelection(gender);
    }
  }
}
