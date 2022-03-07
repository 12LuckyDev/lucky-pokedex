import { add, editPropAt, removeAt, toggle } from '@12luckydev/utils';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PokeGender, PokeRegion } from 'src/app/enums';
import { PokedexSelection, PokedexSelectionModel } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class PokedexSelectionService {
  private _selectionSubject = new Subject<number>();
  private _selectionMap = new Map<number, PokedexSelection>();

  constructor() {}

  get selectionChangeObservable(): Observable<number> {
    return this._selectionSubject.asObservable();
  }

  getSelection(number: number): PokedexSelection {
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
      this._selectionSubject.next(number);
    }
  }

  public changeSelection(number: number | null, gender?: PokeGender) {
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

  public isSelected(number: number, gender?: PokeGender): boolean {
    const selection = this.getSelection(number);
    return typeof gender === 'number'
      ? !!selection.genders?.includes(gender)
      : selection.selected;
  }

  public changeRegionalFormSelection(
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

  public isRegionalFormSelected(
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

  public changeFormSelection(
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

  public isFormSelected(
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
}
