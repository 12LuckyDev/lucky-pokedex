import { remove, compare } from '@12luckydev/utils';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, skip } from 'rxjs';
import { PokedexBaseService } from 'src/app/common';
import { PokedexStorageService } from '../pokedex-storage/pokedex-storage.service';
import { calcWindowSize } from 'src/app/utils';
import {
  CountAlphaPolicy,
  CountFormsPolicy,
  CountGendersPolicy,
  CountGigantamaxPolicy,
  CountRegionalFormsPolicy,
  PokeFormType,
  PokeVariety,
  RefersToType,
} from 'src/app/enums';
import {
  PokedexEntry,
  PokedexFormEntry,
  PokedexGenderDiffs,
  PokedexOptions,
  PokedexOptionsModel,
} from 'src/app/models';
import { FormsData } from 'src/app/models/pokedex-forms-data.model';

@Injectable({
  providedIn: 'root',
})
export class PokedexOptionsService extends PokedexBaseService {
  private _optionsSubject = new BehaviorSubject<PokedexOptions>(
    new PokedexOptionsModel()
  );

  private _tablesColumnsSubject = new BehaviorSubject<string[]>([]);

  constructor(private pokedexStorageService: PokedexStorageService) {
    super();
    this.pokedexStorageService.getOptions().subscribe({
      next: (options) => {
        if (options) {
          this.nextOptions(options);
          this._tablesColumnsSubject.next(this.getTablesColumnsByOptions());
        }
      },
      complete: this.setAsReady,
    });
  }

  public get options(): PokedexOptions {
    return this._optionsSubject.value;
  }

  public get showFormsStatistics(): boolean {
    const { countGendersPolicy, countFormsPolicy, countRegionalFormsPolicy } =
      this.options;
    return (
      countGendersPolicy !== CountGendersPolicy.NO_COUNT ||
      countFormsPolicy !== CountFormsPolicy.NO_COUNT ||
      countRegionalFormsPolicy !== CountRegionalFormsPolicy.NO_COUNT
    );
  }

  public get tablesColumnsObservable(): Observable<string[]> {
    return this._tablesColumnsSubject.asObservable().pipe(skip(1));
  }

  public get tablesColumns(): string[] {
    return this._tablesColumnsSubject.value;
  }

  private getTablesColumnsByOptions(): string[] {
    const {
      countGendersPolicy,
      countFormsPolicy,
      countRegionalFormsPolicy,
      countGigantamaxPolicy,
      countAlphaPolicy,
    } = this.options;

    const showExpand =
      countFormsPolicy !== CountFormsPolicy.NO_COUNT ||
      countRegionalFormsPolicy !== CountRegionalFormsPolicy.NO_COUNT ||
      countGigantamaxPolicy !== CountGigantamaxPolicy.NO_COUNT ||
      countAlphaPolicy !== CountAlphaPolicy.NO_COUNT;

    const colums =
      countGendersPolicy !== CountGendersPolicy.NO_COUNT || showExpand
        ? ['selectAll', 'select', 'number', 'name', 'details']
        : ['select', 'number', 'name', 'details'];

    if (showExpand) {
      colums.push('expand');
    }

    if (calcWindowSize() === 'mobile') {
      return remove(colums, 'name');
    }

    return colums;
  }

  public changeTableColumns() {
    const newColumns = this.getTablesColumnsByOptions();

    if (!compare(newColumns, this._tablesColumnsSubject.value)) {
      this._tablesColumnsSubject.next(newColumns);
    }
  }

  public get optionsObservable(): Observable<PokedexOptions> {
    return this._optionsSubject.asObservable().pipe(skip(1));
  }

  public setOptions(options: PokedexOptions) {
    this.pokedexStorageService.setOptions(options).subscribe();
    this.nextOptions(options);
  }

  private nextOptions(options: PokedexOptions) {
    this._optionsSubject.next(options);
    this.changeTableColumns();
  }

  public get isGenderSelectable(): boolean {
    return this.options.countGendersPolicy !== CountGendersPolicy.NO_COUNT;
  }

  private getShowGendersByGenderDiffs(genderDiffs?: PokedexGenderDiffs) {
    switch (this.options.countGendersPolicy) {
      case CountGendersPolicy.COUNT_ALL:
        return true;
      case CountGendersPolicy.COUNT_ALL_WITH_DIFFS:
        return !!genderDiffs;
      case CountGendersPolicy.NO_COUNT_VISUAL_ONLY:
        return !!genderDiffs && !genderDiffs.onlyVisual;
      case CountGendersPolicy.NO_COUNT:
        return false;
    }
  }

  public filterVarieties(
    varieties: PokeVariety[],
    formsData?: FormsData
  ): { variety: PokeVariety; refersTo: RefersToType }[] {
    const { countAlphaPolicy, countGigantamaxPolicy } = this.options;

    return varieties.map((variety) => {
      switch (variety) {
        case PokeVariety.alpha:
          return {
            variety,
            refersTo:
              countAlphaPolicy === CountAlphaPolicy.COUNT
                ? RefersToType.TO_ALL
                : RefersToType.TO_NONE,
          };
        case PokeVariety.gigantamax: {
          let refersTo = null;
          switch (countGigantamaxPolicy) {
            case CountGigantamaxPolicy.COUNT_ALL:
              refersTo = RefersToType.TO_ALL;
              break;
            case CountGigantamaxPolicy.COUNT_FOR_FORMS_WITH_DIFFS:
              refersTo = formsData?.gigantamaxFormDiffs
                ? RefersToType.TO_ALL
                : RefersToType.TO_BASE;
              break;
            case CountGigantamaxPolicy.NO_COUNT_FOR_FORMS:
              refersTo = RefersToType.TO_BASE;
              break;
            case CountGigantamaxPolicy.NO_COUNT:
              refersTo = RefersToType.TO_NONE;
              break;
          }
          return {
            variety,
            refersTo,
          };
        }
        case PokeVariety.terastal:
          return {
            variety,
            refersTo: RefersToType.TO_NONE,
          };
      }
    });
  }

  private getFormsAreOk(formsData?: FormsData): boolean {
    const { countFormsPolicy } = this.options;

    if (formsData) {
      const { interchandable, onlyVisual } = formsData;
      switch (countFormsPolicy) {
        case CountFormsPolicy.NO_COUNT_INTERCHANDABLE:
          return !interchandable;
        case CountFormsPolicy.NO_COUNT_VISUAL_ONLY:
          return !onlyVisual;
        case CountFormsPolicy.NO_COUNT_VISUAL_ONLY_AND_INTERCHANDABLE:
          return !onlyVisual && !interchandable;
      }
    }

    return countFormsPolicy === CountFormsPolicy.COUNT_ALL;
  }

  public getShowForms(entry: PokedexEntry): boolean {
    const { forms, formsData } = entry;
    return (
      forms.filter(({ formType }) => formType === PokeFormType.form).length >
        0 && this.getFormsAreOk(formsData)
    );
  }

  public filterForms(
    forms: PokedexFormEntry[],
    formsData?: FormsData
  ): PokedexFormEntry[] {
    const { countRegionalFormsPolicy } = this.options;

    return forms.filter(({ formType }) => {
      switch (formType) {
        case PokeFormType.base:
          return true;
        case PokeFormType.form:
          return this.getFormsAreOk(formsData);
        case PokeFormType.regional_form:
          return countRegionalFormsPolicy === CountRegionalFormsPolicy.COUNT;
      }
    });
  }

  public getVariantShowGenders(
    form: PokedexFormEntry,
    variety?: PokeVariety
  ): boolean {
    const {
      applyGenderPolicyToForms,
      applyGenderPolicyToRegionalForms,
      applyGenderPolicyToAlpha,
      applyGenderPolicyToGigantamax,
    } = this.options;

    let showVarietyGender = true;
    switch (variety) {
      case PokeVariety.alpha:
        showVarietyGender = applyGenderPolicyToAlpha;
        break;
      case PokeVariety.gigantamax:
        showVarietyGender = applyGenderPolicyToGigantamax;
        break;
      case PokeVariety.terastal:
        showVarietyGender = false;
        break;
    }

    const { formType, genderDiffs } = form;

    switch (formType) {
      case PokeFormType.base:
        return (
          showVarietyGender && this.getShowGendersByGenderDiffs(genderDiffs)
        );
      case PokeFormType.form:
        return (
          showVarietyGender &&
          applyGenderPolicyToForms &&
          this.getShowGendersByGenderDiffs(genderDiffs)
        );
      case PokeFormType.regional_form:
        return (
          showVarietyGender &&
          applyGenderPolicyToRegionalForms &&
          this.getShowGendersByGenderDiffs(genderDiffs)
        );
    }
  }
}
