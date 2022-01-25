import { Component, Input, OnInit } from '@angular/core';
import { PokeGender } from 'src/app/enums';
import { PokedexEntry, PokedexGenderDiffs } from 'src/app/models';

@Component({
  selector: 'app-gender-diffs',
  templateUrl: './gender-diffs.component.html',
  styleUrls: ['./gender-diffs.component.scss'],
})
export class GenderDiffsComponent implements OnInit {
  @Input() entry!: PokedexEntry;

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
}
