import { add, editPropAt, isArray, removeAt, toggle } from '@12luckydev/utils';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PokeFormType, PokeGender, PokeRegion } from 'src/app/enums';
import {
  PokedexEntry,
  PokedexSelection,
  PokedexSelectionModel,
  PokedexTableForm,
} from 'src/app/models';
import { PokedexOptionsService } from '../pokedex-options/pokedex-options.service';
import { PokedexStorageService } from '../pokedex-storage/pokedex-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PokedexSelectionService {
  private _readySubject = new BehaviorSubject<boolean>(false);

  private _selectionMap = new Map<number, PokedexSelection>();
  private _selectionChangeSubject = new Subject<number>();

  constructor(
    private pokedexStorageService: PokedexStorageService,
    private pokedexOptionsService: PokedexOptionsService
  ) {
    this.pokedexStorageService.getAllSelections().subscribe({
      next: ({ number, selection }) =>
        this._selectionMap.set(number, selection),
      complete: () => this._readySubject.next(true),
    });
  }

  get readyObservable(): Observable<boolean> {
    return this._readySubject.asObservable();
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
      const { genders } = model;

      return typeof gender === 'number'
        ? { ...model, genders: genders ? toggle(genders, gender) : [gender] }
        : {
            ...model,
            selected: !model.selected,
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
      if (typeof gender === 'number') {
        const regionalFormsGenders = model.regionalFormsGenders ?? [];
        const index = regionalFormsGenders.findIndex(
          (rfg) => rfg.region === region
        );
        const genders: PokeGender[] =
          index > -1
            ? toggle(regionalFormsGenders[index].genders, gender)
            : [gender];

        return {
          ...model,
          regionalFormsGenders:
            genders.length > 0
              ? index > -1
                ? editPropAt(regionalFormsGenders, 'genders', genders, index)
                : add(regionalFormsGenders, { region, genders })
              : removeAt(regionalFormsGenders, index),
        };
      } else {
        const { regionalForms } = model;

        return {
          ...model,
          regionalForms: regionalForms
            ? toggle(regionalForms, region)
            : [region],
        };
      }
    });
  }

  private isRegionalFormSelected(
    number: number,
    region: PokeRegion,
    gender?: PokeGender
  ): boolean {
    const selection = this.getSelection(number);
    if (typeof gender === 'number') {
      const regionalFormsGenders =
        selection?.regionalFormsGenders?.find((rfg) => rfg.region === region) ??
        null;
      return !!regionalFormsGenders?.genders?.includes(gender);
    } else {
      return !!selection.regionalForms?.includes(region);
    }
  }

  private changeFormSelection(
    number: number | null,
    form: number,
    gender?: PokeGender
  ) {
    this.updateSelection(number, (model) => {
      if (typeof gender === 'number') {
        const formsGenders = model.formsGenders ?? [];
        const index = formsGenders.findIndex((fg) => fg.form === form);
        const genders: PokeGender[] =
          index > -1 ? toggle(formsGenders[index].genders, gender) : [gender];

        return {
          ...model,
          formsGenders:
            genders.length > 0
              ? index > -1
                ? editPropAt(formsGenders, 'genders', genders, index)
                : add(formsGenders, { form, genders })
              : removeAt(formsGenders, index),
        };
      } else {
        const { forms } = model;

        return {
          ...model,
          forms: forms ? toggle(forms, form) : [form],
        };
      }
    });
  }

  private isFormSelected(
    number: number,
    form: number,
    gender?: PokeGender
  ): boolean {
    const selection = this.getSelection(number);
    if (typeof gender === 'number') {
      const formsGenders =
        selection?.formsGenders?.find((rfg) => rfg.form === form) ?? null;
      return !!formsGenders?.genders?.includes(gender);
    } else {
      return !!selection.forms?.includes(form);
    }
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

      const { showGenders, showForms, showRegionalForms } =
        this.pokedexOptionsService.getShowTypes(entry);

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
      if (showForms) {
        if (showGenders) {
          if (forms?.length === formsGenders?.length) {
            if (
              formsGenders?.some(
                ({ genders: formGenders }) =>
                  !compareGenders(genders, formGenders)
              )
            ) {
              return false;
            }
          } else {
            return false;
          }
        } else if (forms?.length !== selectedForms?.length) {
          return false;
        }
      }

      // if all pokemon regional forms / all of their genders selected
      if (showRegionalForms) {
        if (showGenders) {
          if (regionalForms?.length === regionalFormsGenders?.length) {
            if (
              regionalFormsGenders?.some(
                ({ genders: formGenders }) =>
                  !compareGenders(genders, formGenders)
              )
            ) {
              return false;
            }
          } else {
            return false;
          }
        } else if (regionalForms?.length !== selectedRegionalForms?.length) {
          return false;
        }
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
        genders: selectedGenders,
        forms: selectedForms,
        formsGenders,
        regionalForms: selectedRegionalForms,
        regionalFormsGenders,
      } = selection;

      const { showGenders, showForms, showRegionalForms } =
        this.pokedexOptionsService.getShowTypes(entry);

      // is pokemon / any of it's genders selected
      if (!showForms) {
        if (showGenders) {
          if (isArray(selectedGenders, false)) {
            return true;
          }
        } else if (selected) {
          return true;
        }
      }

      // if some pokemon forms / some of their genders selected
      if (showForms) {
        if (showGenders) {
          if (
            formsGenders?.some(({ genders: formGenders }) =>
              isArray(formGenders, false)
            )
          ) {
            return true;
          }
        } else if (isArray(selectedForms, false)) {
          return true;
        }
      }

      // if some pokemon regional forms / some of their genders selected
      if (showRegionalForms) {
        if (showGenders) {
          if (
            regionalFormsGenders?.some(({ genders: formGenders }) =>
              isArray(formGenders, false)
            )
          ) {
            return true;
          }
        } else if (isArray(selectedRegionalForms, false)) {
          return true;
        }
      }
    }
    return false;
  }

  public selectAll(entry?: PokedexEntry): void {
    if (entry) {
      const selection: PokedexSelection = this.getSelection(entry.number);
      const { genders, forms, regionalForms } = entry;
      const { showGenders, showForms, showRegionalForms } =
        this.pokedexOptionsService.getShowTypes(entry);

      if (showGenders) {
        selection.genders = genders;
      } else {
        selection.selected = true;
      }

      if (showForms) {
        if (showGenders) {
          selection.formsGenders = forms
            ? forms.map((form) => ({ form: form.id, genders }))
            : [];
        } else {
          selection.forms = forms ? forms.map(({ id }) => id) : [];
        }
      }

      if (showRegionalForms) {
        if (showGenders) {
          selection.regionalFormsGenders = regionalForms
            ? regionalForms.map((regionalForm) => ({
                region: regionalForm.region,
                genders,
              }))
            : [];
        } else {
          selection.regionalForms = regionalForms
            ? regionalForms.map(({ region }) => region)
            : [];
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

const compareGenders = (
  genders: PokeGender[],
  selectedGenders?: PokeGender[] | null
) => {
  return selectedGenders ? selectedGenders.length === genders.length : false;
};
