import { Component, Input } from '@angular/core';
import { PokedexBaseComponent } from 'src/app/common';
import { PokeVariantType, PokeGender } from 'src/app/enums';
import { PokedexTableVariant } from 'src/app/models';
import { PokedexSelectionService } from 'src/app/services';
import { formatGender, getImagePath } from 'src/app/utils';

@Component({
  selector: 'pokedex-selection-check',
  templateUrl: './pokedex-selection-check.component.html',
  styleUrls: ['../../../styles/poke-card.scss'],
})
export class PokedexSelectionCheckComponent extends PokedexBaseComponent {
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
    return getImagePath(this.entry, { gender, variant: this.form });
  }

  public get showCheckbox(): boolean {
    return this.selectionType === null ? !this.entry.showForms : true;
  }

  public getGenderName(gender: PokeGender): string {
    return formatGender(gender);
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
