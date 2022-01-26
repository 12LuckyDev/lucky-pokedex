import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PokeGender } from 'src/app/enums';

export interface PokedexSelectionModel {
  selected: boolean;
  genders: PokeGender[] | null;
}

const getNewModel = () => {
  const newModel: PokedexSelectionModel = {
    selected: false,
    genders: [],
  };
  return newModel;
};

@Injectable({
  providedIn: 'root',
})
export class PokedexSelectionService {
  private _selectionSubject = new Subject<number>();
  private _selectionMap = new Map<number, PokedexSelectionModel>();

  constructor() {}

  get selectionChangeObservable(): Observable<number> {
    return this._selectionSubject.asObservable();
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

  updateSelection(number: number, model: PokedexSelectionModel): void {
    this._selectionMap.set(number, model);
    this._selectionSubject.next(number);
  }
}
