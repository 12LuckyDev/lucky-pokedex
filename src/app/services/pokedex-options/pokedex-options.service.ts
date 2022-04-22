import { isArray } from '@12luckydev/utils';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, skip } from 'rxjs';
import {
  CountFormsPolicy,
  CountGendersPolicy,
  CountRegionalFormsPolicy,
  PokeFormType,
} from 'src/app/enums';
import { PokedexEntry, PokedexOptions } from 'src/app/models';
import { PokedexBaseService } from '../pokedex-base-service';
import { PokedexStorageService } from '../pokedex-storage/pokedex-storage.service';

const DEFAULT_OPTIONS: PokedexOptions = {
  countFormsPolicy: CountFormsPolicy.COUNT_ALL,
  countRegionalFormsPolicy: CountRegionalFormsPolicy.COUNT_ALL,
  countGendersPolicy: CountGendersPolicy.NO_COUNT,
};

@Injectable({
  providedIn: 'root',
})
export class PokedexOptionsService extends PokedexBaseService {
  private _optionsSubject = new BehaviorSubject<PokedexOptions>(
    DEFAULT_OPTIONS
  );

  constructor(private pokedexStorageService: PokedexStorageService) {
    super();
    this.pokedexStorageService.getOptions().subscribe({
      next: (options) => {
        console.log(options);

        if (options) {
          this.nextOptions(options);
        }
      },
      complete: this.setAsReady,
    });
  }

  public get options(): PokedexOptions {
    return this._optionsSubject.value;
  }

  public get showSelectAll(): boolean {
    if (this.options) {
      const { countGendersPolicy, countFormsPolicy, countRegionalFormsPolicy } =
        this.options;
      return (
        countGendersPolicy !== CountGendersPolicy.NO_COUNT ||
        countFormsPolicy !== CountFormsPolicy.NO_COUNT ||
        countRegionalFormsPolicy !== CountRegionalFormsPolicy.NO_COUNT
      );
    }
    return false;
  }

  public getOptionsObservable(
    shipInitialValue: boolean = true
  ): Observable<PokedexOptions> {
    return this._optionsSubject
      .asObservable()
      .pipe(skip(shipInitialValue ? 1 : 0));
  }

  public setOptions(options: PokedexOptions) {
    this.pokedexStorageService.setOptions(options).subscribe();
    this._optionsSubject.next(options);
  }

  private nextOptions(options: PokedexOptions) {
    this._optionsSubject.next(options);
  }

  public get isGenderSelectable(): boolean {
    return this.options.countGendersPolicy !== CountGendersPolicy.NO_COUNT;
  }

  public getShowGender(
    entry?: PokedexEntry,
    selectMode: PokeFormType | null = null
  ): boolean {
    if (entry) {
      switch (this.options.countGendersPolicy) {
        case CountGendersPolicy.COUNT_ALL:
          return true;
        case CountGendersPolicy.COUNT_ALL_WITH_DIFFS:
          return !!entry.genderDiffs && selectMode === null;
        case CountGendersPolicy.NO_COUNT_VISUAL_ONLY:
          return !!entry.genderDiffs && !entry.genderDiffs.onlyVisual;
        case CountGendersPolicy.NO_COUNT:
          return false;
      }
    }
    return false;
  }

  public getShowForms(entry?: PokedexEntry): boolean {
    if (entry) {
      switch (this.options.countFormsPolicy) {
        case CountFormsPolicy.COUNT_ALL:
          return isArray(entry.forms, false);
        case CountFormsPolicy.NO_COUNT_VISUAL_ONLY:
          return !entry.formDiffsOnlyVisual && isArray(entry.forms, false);
        case CountFormsPolicy.NO_COUNT:
          return false;
      }
    }
    return false;
  }

  public getShowRegionalForms(entry?: PokedexEntry): boolean {
    if (entry) {
      switch (this.options.countRegionalFormsPolicy) {
        case CountRegionalFormsPolicy.COUNT_ALL:
          return isArray(entry.regionalForms, false);
        case CountRegionalFormsPolicy.NO_COUNT:
          return false;
      }
    }
    return false;
  }

  public getShowTypes(entry?: PokedexEntry): {
    showGenders: boolean;
    showForms: boolean;
    showRegionalForms: boolean;
  } {
    return {
      showGenders: this.getShowGender(entry),
      showForms: this.getShowForms(entry),
      showRegionalForms: this.getShowRegionalForms(entry),
    };
  }

  public getIsExpandable(entry?: PokedexEntry): boolean {
    return this.getShowForms(entry) || this.getShowRegionalForms(entry);
  }

  public getShowSelectAllCheckbox(entry?: PokedexEntry): boolean {
    return this.getShowGender(entry) || this.getIsExpandable(entry);
  }
}
