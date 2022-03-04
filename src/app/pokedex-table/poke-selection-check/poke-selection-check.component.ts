import { toggle } from '@12luckydev/utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountGendersPolicy, PokeGender } from 'src/app/enums';
import { PokedexOptionsService } from 'src/app/services/pokedex-options/pokedex-options.service';
import { PokedexSelectionService } from 'src/app/services/pokedex-selection/pokedex-selection.service';
import { SelectionChangeAwareComponent } from '../poke-entry-details/selection-change-aware/selection-change-aware.component';

const getGenderName = (gender: PokeGender) => {
  return PokeGender[gender];
};

@Component({
  selector: 'app-poke-selection-check',
  templateUrl: './poke-selection-check.component.html',
  styleUrls: ['./poke-selection-check.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokeSelectionCheckComponent extends SelectionChangeAwareComponent {
  constructor(
    override pokedexSelectionService: PokedexSelectionService,
    private pokedexOptionsService: PokedexOptionsService
  ) {
    super(pokedexSelectionService);
  }

  get presentationMode(): string {
    if (this.entry) {
      switch (this.pokedexOptionsService.options.countGendersPolicy) {
        case CountGendersPolicy.COUNT_ALL:
          return 'GENDERS';
        case CountGendersPolicy.COUNT_ALL_WITH_DIFFS:
          return !!this.entry.genderDiffs ? 'GENDERS' : 'CHECKBOX_WITH_IMG';
        case CountGendersPolicy.NO_COUNT_VISUAL_ONLY:
          return !!this.entry.genderDiffs && !this.entry.genderDiffs.onlyVisual
            ? 'GENDERS'
            : 'CHECKBOX_WITH_IMG';
        case CountGendersPolicy.NO_COUNT:
          return 'CHECKBOX';
      }
    }
    return 'CHECKBOX';
  }

  get showGenders(): boolean {
    if (this.entry) {
      switch (this.pokedexOptionsService.options.countGendersPolicy) {
        case CountGendersPolicy.COUNT_ALL:
          return true;
        case CountGendersPolicy.COUNT_ALL_WITH_DIFFS:
          return !!this.entry.genderDiffs;
        case CountGendersPolicy.NO_COUNT_VISUAL_ONLY:
          return !!this.entry.genderDiffs && !this.entry.genderDiffs.onlyVisual;
        case CountGendersPolicy.NO_COUNT:
          return false;
      }
    }
    return false;
  }

  get genders(): PokeGender[] {
    return this.entry ? this.entry.genders : [];
  }

  getImgPath(gender?: PokeGender): string | number {
    const genderDiffs = this.entry?.genderDiffs;
    return gender === PokeGender.female && genderDiffs
      ? genderDiffs.femaleImgPath
      : this.number ?? '';
  }

  getGenderName(gender: PokeGender): string {
    return gender !== null || gender !== undefined ? getGenderName(gender) : '';
  }

  showIcon(gender: PokeGender) {
    return gender !== PokeGender.genderless;
  }

  isSelected(gender?: PokeGender): boolean {
    if (this.number) {
      const selection = this.pokedexSelectionService.getSelection(this.number);
      return typeof gender === 'number'
        ? !!selection.genders?.includes(gender)
        : selection.selected;
    }
    return false;
  }

  changeSelection(gender?: PokeGender): void {
    if (this.number) {
      this.pokedexSelectionService.changeSelection(this.number, gender);
    }
  }
}
