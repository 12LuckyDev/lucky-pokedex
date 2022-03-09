import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import {
  CountFormsPolicy,
  CountGendersPolicy,
  CountRegionalFormsPolicy,
} from 'src/app/enums';
import { PokedexEntry, PokedexOptions } from 'src/app/models';
import { SelectionType } from 'src/app/pokedex-table/poke-selection-check/poke-selection-check.component';
import { PokedexStorageService } from '../pokedex-storage/pokedex-storage.service';

const DEFAULT_OPTIONS: PokedexOptions = {
  countFormsPolicy: CountFormsPolicy.COUNT_ALL,
  countRegionalFormsPolicy: CountRegionalFormsPolicy.COUNT_ALL,
  countGendersPolicy: CountGendersPolicy.NO_COUNT,
};

@Injectable({
  providedIn: 'root',
})
export class PokedexOptionsService {
  private _optionsSubject = new BehaviorSubject<PokedexOptions | null>(
    DEFAULT_OPTIONS
  );

  constructor(private pokedexStorageService: PokedexStorageService) {
    this.pokedexStorageService.getOptions().subscribe((options) => {
      console.log(options);

      if (options) {
        this.nextOptions(options);
      }
    });
  }

  public get optionsObservable(): Observable<PokedexOptions | null> {
    return this._optionsSubject.asObservable();
  }

  public get options(): PokedexOptions | null {
    return this._optionsSubject.value;
  }

  public setOptions(options: PokedexOptions) {
    this.pokedexStorageService.setOptions(options).subscribe();
    this._optionsSubject.next(options);
  }

  private nextOptions(options: PokedexOptions) {
    this._optionsSubject.next(options);
  }

  public getPresentationMode(
    entry?: PokedexEntry,
    selectMode: SelectionType = SelectionType.POKEMON
  ): 'GENDERS' | 'CHECKBOX_WITH_IMG' {
    if (entry && this.options) {
      switch (this.options.countGendersPolicy) {
        case CountGendersPolicy.COUNT_ALL:
          return 'GENDERS';
        case CountGendersPolicy.COUNT_ALL_WITH_DIFFS:
          return !!entry.genderDiffs
            ? selectMode === SelectionType.POKEMON
              ? 'GENDERS'
              : 'CHECKBOX_WITH_IMG'
            : 'CHECKBOX_WITH_IMG';
        case CountGendersPolicy.NO_COUNT_VISUAL_ONLY:
          return !!entry.genderDiffs && !entry.genderDiffs.onlyVisual
            ? 'GENDERS'
            : 'CHECKBOX_WITH_IMG';
        case CountGendersPolicy.NO_COUNT:
          return 'CHECKBOX_WITH_IMG';
      }
    }
    return 'CHECKBOX_WITH_IMG';
  }
}
