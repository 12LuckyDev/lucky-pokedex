import { isArray, toggle } from '@12luckydev/utils';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PokeFormType, PokeGender, PokeRegion } from 'src/app/enums';
import {
  PokedexEntry,
  PokedexSelection,
  PokedexSelectionModel,
  PokedexTableForm,
} from 'src/app/models';
import { PokedexBaseService } from '../pokedex-base-service';
import { PokedexOptionsService } from '../pokedex-options/pokedex-options.service';
import { PokedexStorageService } from '../pokedex-storage/pokedex-storage.service';
import {
  checkIsAllFormsSelected,
  checkIsFormGenderSelected,
  checkIsSomeFormsSelected,
  compareGenders,
  handleFormGenderChange,
} from './pokedex-selection-utils';

@Injectable({
  providedIn: 'root',
})
export class PokedexSelectionService extends PokedexBaseService {
  private _selectionMap = new Map<number, PokedexSelection>();
  private _selectionChangeSubject = new Subject<number>();

  constructor(
    private pokedexStorageService: PokedexStorageService,
    private pokedexOptionsService: PokedexOptionsService
  ) {
    super();
    this.pokedexStorageService.getAllSelections().subscribe({
      next: ({ number, selection }) =>
        this._selectionMap.set(number, selection),
      complete: this.setAsReady,
    });
  }

  get selectionChangeObservable(): Observable<number> {
    return this._selectionChangeSubject.asObservable();
  }

  private getSelection(number: number): PokedexSelection {
    const model = this._selectionMap.get(number);
    if (model) {
      return model;
    } else {
      const newModel: PokedexSelection = new PokedexSelectionModel();
      this._selectionMap.set(number, newModel);
      return newModel;
    }
  }

  private updateSelection(
    number: number | null,
    model: (model: PokedexSelection) => PokedexSelection
  ): void {
    if (number !== null) {
      const newModel = model(this.getSelection(number));
      console.log(number, newModel);
      this._selectionMap.set(number, newModel);
      this.pokedexStorageService.setSelection(number, newModel);
      this._selectionChangeSubject.next(number);
    }
  }

  private changePokemonSelection(number: number | null, gender?: PokeGender) {
    this.updateSelection(number, (model) => {
      const { genders, selected } = model;

      return typeof gender === 'number'
        ? { ...model, genders: genders ? toggle(genders, gender) : [gender] }
        : {
            ...model,
            selected: !selected,
          };
    });
  }

  public isPokemonSelected(number: number, gender?: PokeGender): boolean {
    const selection = this.getSelection(number);
    return typeof gender === 'number'
      ? !!selection.genders?.includes(gender)
      : selection.selected;
  }

  private changeRegionalFormSelection(
    number: number | null,
    region: PokeRegion,
    gender?: PokeGender
  ) {
    this.updateSelection(number, (model) => {
      const { regionalFormsGenders, regionalForms } = model;
      return typeof gender === 'number'
        ? {
            ...model,
            regionalFormsGenders: handleFormGenderChange(
              regionalFormsGenders,
              region,
              gender
            ),
          }
        : {
            ...model,
            regionalForms: regionalForms
              ? toggle(regionalForms, region)
              : [region],
          };
    });
  }

  private isRegionalFormSelected(
    number: number,
    region: PokeRegion,
    gender?: PokeGender
  ): boolean {
    const selection = this.getSelection(number);
    return typeof gender === 'number'
      ? checkIsFormGenderSelected(
          selection?.regionalFormsGenders,
          region,
          gender
        )
      : !!selection.regionalForms?.includes(region);
  }

  private changeFormSelection(
    number: number | null,
    form: number,
    gender?: PokeGender
  ) {
    this.updateSelection(number, (model) => {
      const { formsGenders, forms } = model;
      return typeof gender === 'number'
        ? {
            ...model,
            formsGenders: handleFormGenderChange(formsGenders, form, gender),
          }
        : {
            ...model,
            forms: forms ? toggle(forms, form) : [form],
          };
    });
  }

  private isFormSelected(
    number: number,
    form: number,
    gender?: PokeGender
  ): boolean {
    const selection = this.getSelection(number);
    return typeof gender === 'number'
      ? checkIsFormGenderSelected(selection?.formsGenders, form, gender)
      : !!selection.forms?.includes(form);
  }

  public changeSelection(
    number: number | null,
    form?: PokedexTableForm,
    gender?: PokeGender
  ): void {
    if (form) {
      const { formType, id } = form;
      switch (formType) {
        case PokeFormType.form:
          this.changeFormSelection(number, id, gender);
          break;
        case PokeFormType.regional_form:
          this.changeRegionalFormSelection(number, id, gender);
          break;
      }
    } else {
      this.changePokemonSelection(number, gender);
    }
  }

  public isSelected(
    number: number | null,
    form?: PokedexTableForm,
    gender?: PokeGender
  ): boolean {
    if (number) {
      if (form) {
        const { formType, id } = form;
        switch (formType) {
          case PokeFormType.form:
            return this.isFormSelected(number, id, gender);
          case PokeFormType.regional_form:
            return this.isRegionalFormSelected(number, id, gender);
        }
      } else {
        return this.isPokemonSelected(number, gender);
      }
    }
    return false;
  }

  public isAllSelected(entry?: PokedexEntry): boolean {
    if (entry) {
      const { number, genders, forms, regionalForms } = entry;

      const selection = this.getSelection(number);
      const {
        selected,
        genders: selectedGenders,
        forms: selectedForms,
        formsGenders,
        regionalForms: selectedRegionalForms,
        regionalFormsGenders,
      } = selection;

      const showTypes = this.pokedexOptionsService.getShowTypes(entry);
      const { showGenders, showForms, showRegionalForms } = showTypes;

      // is pokemon / all it's genders selected
      if (!showForms) {
        if (showGenders) {
          if (!compareGenders(genders, selectedGenders)) {
            return false;
          }
        } else if (!selected) {
          return false;
        }
      }

      // if all pokemon forms / all of their genders selected
      if (
        showForms &&
        !checkIsAllFormsSelected(
          showGenders,
          genders,
          selectedForms,
          formsGenders,
          forms
        )
      ) {
        return false;
      }

      // if all pokemon regional forms / all of their genders selected
      if (
        showRegionalForms &&
        !checkIsAllFormsSelected(
          showGenders,
          genders,
          selectedRegionalForms,
          regionalFormsGenders,
          regionalForms
        )
      ) {
        return false;
      }

      return true;
    }
    return false;
  }

  public isSomeSelected(entry?: PokedexEntry): boolean {
    if (entry) {
      const { number } = entry;

      const selection = this.getSelection(number);
      const {
        selected,
        genders,
        forms,
        formsGenders,
        regionalForms,
        regionalFormsGenders,
      } = selection;

      const showTypes = this.pokedexOptionsService.getShowTypes(entry);
      const { showGenders, showForms, showRegionalForms } = showTypes;

      // is pokemon / any of it's genders selected
      if (!showForms) {
        if (showGenders) {
          if (isArray(genders, false)) {
            return true;
          }
        } else if (selected) {
          return true;
        }
      }

      // if some pokemon forms / some of their genders selected
      if (
        showForms &&
        checkIsSomeFormsSelected(showForms, forms, formsGenders)
      ) {
        return true;
      }

      // if some pokemon regional forms / some of their genders selected
      if (
        showRegionalForms &&
        checkIsSomeFormsSelected(showForms, regionalForms, regionalFormsGenders)
      ) {
        return true;
      }
    }
    return false;
  }

  public selectAll(entry?: PokedexEntry): void {
    if (entry) {
      const selection: PokedexSelection = this.getSelection(entry.number);
      const { genders, forms, regionalForms } = entry;
      const showTypes = this.pokedexOptionsService.getShowTypes(entry);
      const { showGenders, showForms, showRegionalForms } = showTypes;

      if (showGenders) {
        selection.genders = genders;
      } else {
        selection.selected = true;
      }

      if (showForms) {
        if (showGenders) {
          selection.formsGenders = forms
            ? forms.map(({ id }) => ({ id, genders }))
            : null;
        } else {
          selection.forms = forms ? forms.map(({ id }) => id) : null;
        }
      }

      if (showRegionalForms) {
        if (showGenders) {
          selection.regionalFormsGenders = regionalForms
            ? regionalForms.map(({ region }) => ({
                id: region,
                genders,
              }))
            : null;
        } else {
          selection.regionalForms = regionalForms
            ? regionalForms.map(({ region }) => region)
            : null;
        }
      }

      this.updateSelection(entry.number, () => selection);
    }
  }

  public deselectAll(entry?: PokedexEntry): void {
    if (entry) {
      this.updateSelection(entry.number, () => new PokedexSelectionModel());
    }
  }
}
