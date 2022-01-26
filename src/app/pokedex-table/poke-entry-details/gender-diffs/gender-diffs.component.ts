import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokeGender } from 'src/app/enums';
import { PokedexEntry, PokedexGenderDiffs } from 'src/app/models';

@Component({
  selector: 'app-gender-diffs',
  templateUrl: './gender-diffs.component.html',
  styleUrls: ['./gender-diffs.component.scss'],
})
export class GenderDiffsComponent implements OnInit {
  @Input() entry!: PokedexEntry;
  @Input() selectedGenders: PokeGender[] = [];
  @Output() genderSelectionChange = new EventEmitter<PokeGender[]>();

  constructor() {}

  ngOnInit(): void {}

  public get genderDiffs(): PokedexGenderDiffs | null {
    return this.entry ? this.entry.genderDiffs ?? null : null;
  }

  public get genders(): PokeGender[] {
    return this.entry ? this.entry.genders : [];
  }

  public get number(): number | null {
    return this.entry ? this.entry.number : null;
  }

  public isSelected(gender: PokeGender) {
    return this.selectedGenders.includes(gender);
  }

  public selectionChange({
    selected,
    gender,
  }: {
    selected: boolean;
    gender: PokeGender;
  }) {
    if (selected) {
      this.selectedGenders.push(gender);
    } else {
      this.selectedGenders.splice(this.selectedGenders.indexOf(gender), 1);
    }
    this.genderSelectionChange.emit(this.selectedGenders);
  }
}
