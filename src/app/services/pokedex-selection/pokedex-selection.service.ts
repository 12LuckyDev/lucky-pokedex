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

  updateSelection(
    number: number,
    model: PokedexSelection | ((model: PokedexSelection) => PokedexSelection)
  ): void {
    const newModel =
      typeof model === 'function' ? model(this.getSelection(number)) : model;
    console.log(number, newModel);
    this._selectionMap.set(number, newModel);
    this._selectionSubject.next(number);
  }

  changeSelection(number: number, gender?: PokeGender) {
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

  changeRegionalFormSelection(
    number: number,
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

  changeFormSelection(number: number, form: number, gender?: PokeGender) {
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
}
