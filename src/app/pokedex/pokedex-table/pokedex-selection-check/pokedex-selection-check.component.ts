import { Component, Input } from '@angular/core';
import { PokedexBaseComponent } from 'src/app/common';
import { PokeGender } from 'src/app/enums';
import { PokedexTableVariant } from 'src/app/models';
import { PokedexSelectionService } from 'src/app/services';
import { formatGender, getImagePath } from 'src/app/utils';

@Component({
  selector: 'pokedex-selection-check',
  templateUrl: './pokedex-selection-check.component.html',
  styleUrls: ['../../../styles/poke-card.scss'],
})
export class PokedexSelectionCheckComponent extends PokedexBaseComponent {
  @Input() variant!: PokedexTableVariant;
  @Input() subList: boolean = false;

  constructor(private pokedexSelectionService: PokedexSelectionService) {
    super();
  }

  public get showGender(): boolean {
    return this.variant.showGender;
  }

  public get genders(): PokeGender[] {
    return this.entry.genders;
  }

  public getImagePath(gender?: PokeGender): string {
    return getImagePath(this.entry, this.variant, gender);
  }

  public get showCheckbox(): boolean {
    return !this.subList ? !this.entry.showForms : true;
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
      this.variant,
      gender
    );
  }

  public changeSelection(gender?: PokeGender): void {
    this.pokedexSelectionService.changeSelection(
      this.entry,
      this.variant,
      gender
    );
  }

  public onCardClick(event: MouseEvent, gender?: PokeGender) {
    event.stopPropagation();
    if (this.showCheckbox) {
      this.changeSelection(gender);
    }
  }
}
