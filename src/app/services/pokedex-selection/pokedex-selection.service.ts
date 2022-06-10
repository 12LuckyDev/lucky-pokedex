import { toggle } from '@12luckydev/utils';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PokedexBaseService } from 'src/app/base';
import { PokeFormType, PokeGender } from 'src/app/enums';
import {
  PokedexEntry,
  PokedexSelection,
  PokedexSelectionModel,
  PokedexTableForm,
  SpecyficSelection,
} from 'src/app/models';
import { PokedexOptionsService } from '../pokedex-options/pokedex-options.service';
import { PokedexStorageService } from '../pokedex-storage/pokedex-storage.service';
import { getAllSelections } from './pokedex-selection-utils';

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

  private changeSpecyficSelection(
    number: number | null,
    specyficSelection: SpecyficSelection[]
  ): void {
    this.updateSelection(number, (model) => ({ ...model, specyficSelection }));
  }

  public changeSelection(
    number: number | null,
    form?: PokedexTableForm,
    gender?: PokeGender
  ): void {
    if (number) {
      const { specyficSelection } = this.getSelection(number);

      if (form) {
        const { formType, id } = form;
        switch (formType) {
          case PokeFormType.form:
            this.changeSpecyficSelection(
              number,
              toggle(
                specyficSelection,
                { baseForm: false, gender, formId: id },
                (el) => !el.baseForm && el.gender === gender && el.formId === id
              )
            );
            break;
          case PokeFormType.regional_form:
            this.changeSpecyficSelection(
              number,
              toggle(
                specyficSelection,
                { baseForm: false, gender, regionalForm: id },
                (el) =>
                  !el.baseForm && el.gender === gender && el.regionalForm === id
              )
            );
            break;
        }
      } else {
        this.changeSpecyficSelection(
          number,
          toggle(
            specyficSelection,
            { baseForm: true, gender },
            (el) => el.baseForm && el.gender === gender
          )
        );
      }
    }
  }

  public isSelected(
    number: number | null,
    form?: PokedexTableForm,
    gender?: PokeGender
  ): boolean {
    if (number) {
      const { specyficSelection } = this.getSelection(number);

      if (form) {
        const { formType, id } = form;
        switch (formType) {
          case PokeFormType.form:
            return !!specyficSelection.find(
              (el) => !el.baseForm && el.gender === gender && el.formId === id
            );
          case PokeFormType.regional_form:
            return !!specyficSelection.find(
              (el) =>
                !el.baseForm && el.gender === gender && el.regionalForm === id
            );
        }
      } else {
        return !!specyficSelection.find(
          (el) => el.baseForm && el.gender === gender
        );
      }
    }
    return false;
  }

  public isAllSelected(entry?: PokedexEntry): boolean {
    if (entry) {
      const { specyficSelection } = this.getSelection(entry.number);
      const allSelection = getAllSelections(
        entry,
        this.pokedexOptionsService.getShowTypes(entry)
      );

      return allSelection.length === specyficSelection.length;
    }
    return false;
  }

  public isSomeSelected(entry?: PokedexEntry): boolean {
    if (entry) {
      const { specyficSelection } = this.getSelection(entry.number);
      return specyficSelection.length > 0;
    }
    return false;
  }

  public selectAll(entry?: PokedexEntry): void {
    if (entry) {
      this.changeSpecyficSelection(
        entry.number,
        getAllSelections(entry, this.pokedexOptionsService.getShowTypes(entry))
      );
    }
  }

  public deselectAll(entry?: PokedexEntry): void {
    if (entry) {
      this.updateSelection(entry.number, () => new PokedexSelectionModel());
    }
  }
}
