import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PokeGender, PokeRegion } from 'src/app/enums';

export interface PokedexSelectionModel {
  selected: boolean;
  genders: PokeGender[] | null;
  regionalForms: PokeRegion[] | null;
  forms: number[] | null;
}

const getNewModel = () => {
  const newModel: PokedexSelectionModel = {
    selected: false,
    genders: [],
    regionalForms: null,
    forms: null,
  };
  return newModel;
};

@Injectable({
  providedIn: 'root',
})
export class PokedexSelectionService {
  private _selectionSubject = new Subject<number>();
  private _selectionMap = new Map<number, PokedexSelectionModel>();

  constructor() {
    // const temp1 = this.getSelection(1);
    // temp1.selected = true;
    // this._selectionMap.set(1, temp1);
    // const temp19 = this.getSelection(19);
    // temp19.regionalForms = [6];
    // this._selectionMap.set(19, temp19);
  }

  get selectionChangeObservable(): Observable<number> {
    return this._selectionSubject.asObservable();
  }

  get selectionMap() {
    return this._selectionMap;
  }

  getSelection(number: number): PokedexSelectionModel {
    const model = this._selectionMap.get(number);
    if (model) {
      return model;
    } else {
      const newModel: PokedexSelectionModel = getNewModel();
      this._selectionMap.set(number, newModel);
      return newModel;
    }
  }

  updateSelection(
    number: number,
    model:
      | PokedexSelectionModel
      | ((model: PokedexSelectionModel) => PokedexSelectionModel)
  ): void {
    const newModel =
      typeof model === 'function' ? model(this.getSelection(number)) : model;
    console.log(number, newModel);
    this._selectionMap.set(number, newModel);
    this._selectionSubject.next(number);
  }
}
