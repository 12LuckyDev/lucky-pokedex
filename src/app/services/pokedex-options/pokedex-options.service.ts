import { isArray } from '@12luckydev/utils';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, skip } from 'rxjs';
import { PokedexBaseService } from 'src/app/base';
import {
  CountAlphaPolicy,
  CountFormsPolicy,
  CountGendersPolicy,
  CountGigantamaxPolicy,
  CountRegionalFormsPolicy,
  PokeFormType,
  PokeRegion,
} from 'src/app/enums';
import {
  PokedexEntry,
  PokedexOptions,
  PokedexOptionsModel,
  PokedexShowTypes,
  PokedexTableForm,
} from 'src/app/models';
import { PokedexStorageService } from '../pokedex-storage/pokedex-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PokedexOptionsService extends PokedexBaseService {
  private _optionsSubject = new BehaviorSubject<PokedexOptions>(
    new PokedexOptionsModel()
  );

  constructor(private pokedexStorageService: PokedexStorageService) {
    super();
    this.pokedexStorageService.getOptions().subscribe({
      next: (options) => {
        if (options) {
          this.nextOptions(options);
        }
      },
      complete: this.setAsReady,
    });
  }

  get serviceName(): string {
    return 'options';
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

  public get tablesColumns(): string[] {
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
        ? ['selectAll', 'select', 'number', 'name', 'types']
        : ['select', 'number', 'name', 'types'];

    if (showExpand) {
      colums.push('expand');
    }

    return colums;
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
    selectMode: PokeFormType | null = null,
    form?: PokedexTableForm
  ): boolean {
    if (entry) {
      switch (this.options.countGendersPolicy) {
        case CountGendersPolicy.COUNT_ALL:
          return true;
        case CountGendersPolicy.COUNT_ALL_WITH_DIFFS:
          return selectMode === null
            ? !!entry.genderDiffs
            : !!form?.genderDiffs;
        case CountGendersPolicy.NO_COUNT_VISUAL_ONLY:
          return selectMode === null
            ? !!entry.genderDiffs && !entry.genderDiffs.onlyVisual
            : !!form?.genderDiffs && !entry?.genderDiffs?.onlyVisual;
        case CountGendersPolicy.NO_COUNT:
          return false;
      }
    }
    return false;
  }

  public getShowForms(entry?: PokedexEntry): boolean {
    if (entry) {
      const { formsData } = entry;
      if (formsData) {
        switch (this.options.countFormsPolicy) {
          case CountFormsPolicy.COUNT_ALL:
            return isArray(formsData.forms, false);
          case CountFormsPolicy.NO_COUNT_VISUAL_ONLY:
            return !formsData.onlyVisual && isArray(formsData.forms, false);
          case CountFormsPolicy.NO_COUNT:
            return false;
        }
      }
    }
    return false;
  }

  private getShowRegionalForms(entry?: PokedexEntry): boolean {
    if (entry) {
      switch (this.options.countRegionalFormsPolicy) {
        case CountRegionalFormsPolicy.COUNT:
          return isArray(entry.regionalForms, false);
        case CountRegionalFormsPolicy.NO_COUNT:
          return false;
      }
    }
    return false;
  }

  private getShowGigantamax(entry?: PokedexEntry): boolean {
    if (entry) {
      switch (this.options.countGigantamaxPolicy) {
        case CountGigantamaxPolicy.COUNT_ALL:
        case CountGigantamaxPolicy.COUNT_FOR_FORMS_WITH_DIFFS:
        case CountGigantamaxPolicy.NO_COUNT_FOR_FORMS:
          return !!entry.gigantamax?.factor;
        case CountGigantamaxPolicy.NO_COUNT:
          return false;
      }
    }
    return false;
  }

  private getShowGigantamaxPerForm(entry?: PokedexEntry): boolean {
    if (entry) {
      const { formsData, gigantamax } = entry;
      if (formsData) {
        const hasForms = isArray(formsData.forms, false);
        switch (this.options.countGigantamaxPolicy) {
          case CountGigantamaxPolicy.COUNT_ALL:
            return hasForms && !!gigantamax?.factor;
          case CountGigantamaxPolicy.COUNT_FOR_FORMS_WITH_DIFFS:
            return hasForms && !!gigantamax?.factor && !!gigantamax?.formDiffs;
          case CountGigantamaxPolicy.NO_COUNT_FOR_FORMS:
          case CountGigantamaxPolicy.NO_COUNT:
            return false;
        }
      }
    }
    return false;
  }

  private getShowAlpha(entry?: PokedexEntry): boolean {
    if (entry) {
      switch (this.options.countAlphaPolicy) {
        case CountAlphaPolicy.COUNT:
          return !!entry.alpha;
        case CountAlphaPolicy.NO_COUNT:
          return false;
      }
    }
    return false;
  }

  private getShowAlphaForms(entry?: PokedexEntry): number[] {
    const forms: number[] = [];
    if (entry && this.options.countAlphaPolicy === CountAlphaPolicy.COUNT) {
      const { formsData } = entry;
      if (isArray(formsData?.forms, false)) {
        formsData?.forms.forEach(({ alpha, id }) => {
          if (alpha) {
            forms.push(id);
          }
        });
      }
    }
    return forms;
  }

  private getShowAlphaRegionalForms(entry?: PokedexEntry): PokeRegion[] {
    const forms: number[] = [];
    if (entry && this.options.countAlphaPolicy === CountAlphaPolicy.COUNT) {
      if (isArray(entry.regionalForms, false)) {
        entry.regionalForms?.forEach(({ alpha, region }) => {
          if (alpha) {
            forms.push(region);
          }
        });
      }
    }
    return forms;
  }

  public getShowTypes(entry?: PokedexEntry): PokedexShowTypes {
    return {
      showGenders: this.getShowGender(entry),
      showForms: this.getShowForms(entry),
      showRegionalForms: this.getShowRegionalForms(entry),
      showGigantamax: this.getShowGigantamax(entry),
      showGigantamaxPerForm: this.getShowGigantamaxPerForm(entry),
      showAlpha: this.getShowAlpha(entry),
      showAlphaForms: this.getShowAlphaForms(entry),
      showAlphaRegionalForms: this.getShowAlphaRegionalForms(entry),
    };
  }

  public getIsExpandable(entry?: PokedexEntry): boolean {
    return (
      this.getShowForms(entry) ||
      this.getShowRegionalForms(entry) ||
      this.getShowGigantamax(entry) ||
      this.getShowAlpha(entry)
    );
  }

  public getShowSelectAllCheckbox(entry?: PokedexEntry): boolean {
    return this.getShowGender(entry) || this.getIsExpandable(entry);
  }
}
