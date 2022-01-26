import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokeGender } from 'src/app/enums';
import { PokedexGenderDiffs } from 'src/app/models';

const getGenderName = (gender: PokeGender) => {
  return PokeGender[gender];
};

@Component({
  selector: 'app-gender-info',
  templateUrl: './gender-info.component.html',
  styleUrls: ['./gender-info.component.scss'],
})
export class GenderInfoComponent implements OnInit {
  @Input() pokeNumber!: number | null;
  @Input() gender!: PokeGender;
  @Input() genderDiffs!: PokedexGenderDiffs | null;
  @Input() selected: boolean = false;
  @Output() selectionChange = new EventEmitter<{
    selected: boolean;
    gender: PokeGender;
  }>();

  constructor() {}

  ngOnInit(): void {}

  get showIcon(): boolean {
    return this.gender !== PokeGender.genderless;
  }

  get imgPath(): string | number {
    return this.gender === PokeGender.female && this.genderDiffs
      ? this.genderDiffs.femaleImgPath
      : this.pokeNumber ?? '';
  }

  get genderName(): string {
    return this.gender !== null || this.gender !== undefined
      ? getGenderName(this.gender)
      : '';
  }

  public onSelectionChange() {
    this.selectionChange.emit({
      selected: !this.selected,
      gender: this.gender,
    });
  }
}
