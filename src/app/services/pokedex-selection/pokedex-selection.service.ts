import { toggle } from '@12luckydev/utils';
import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { PokedexBaseService } from 'src/app/base';
import { PokeFormType, PokeGender } from 'src/app/enums';
import {
  PokedexEntry,
  PokedexTableForm,
  SpecyficSelection,
} from 'src/app/models';
import { PokedexStorageService } from '../pokedex-storage/pokedex-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PokedexSelectionService extends PokedexBaseService {
  private _selectionMap = new Map<number, SpecyficSelection[]>();
  private _selectionChangeSubject = new Subject<{
    entry: PokedexEntry;
    newSelection: SpecyficSelection[];
    oldSelection: SpecyficSelection[];
  }>();

  constructor(private pokedexStorageService: PokedexStorageService) {
    super();
    this.pokedexStorageService
      .getAllSelections()
      .pipe(filter(({ selection }) => selection.length > 0))
      .subscribe({
        next: ({ number, selection }) =>
          this._selectionMap.set(number, selection),
        complete: this.setAsReady,
      });
  }

  protected get serviceName(): string {
    return 'selection';
  }

  public get selectionChangeObservable(): Observable<{
    entry: PokedexEntry;
    newSelection: SpecyficSelection[];
    oldSelection: SpecyficSelection[];
  }> {
    return this._selectionChangeSubject.asObservable();
  }

  public getSelection(number: number): SpecyficSelection[] {
    return this._selectionMap.get(number) ?? [];
  }

  public updateSelection(
    entry: PokedexEntry,
    newSelection: SpecyficSelection[]
  ): void {
    const { number } = entry;
    const oldSelection = this.getSelection(number);

    console.log(number, newSelection);
    this._selectionMap.set(number, newSelection);
    this.pokedexStorageService.setSelection(number, newSelection);
    this._selectionChangeSubject.next({
      entry,
      newSelection,
      oldSelection,
    });
  }

  public changeSelection(
    entry?: PokedexEntry,
    form?: PokedexTableForm,
    gender?: PokeGender
  ): void {
    if (entry) {
      const selection = this.getSelection(entry.number);
      let newSelection = null;

      if (form) {
        const { formType, id } = form;

        switch (formType) {
          case PokeFormType.form:
            newSelection = toggle(
              selection,
              { baseForm: false, gender, formId: id },
              (el) => !el.baseForm && el.gender === gender && el.formId === id
            );
            break;
          case PokeFormType.regional_form:
            newSelection = toggle(
              selection,
              { baseForm: false, gender, regionalForm: id },
              (el) =>
                !el.baseForm && el.gender === gender && el.regionalForm === id
            );
            break;
        }
      } else {
        newSelection = toggle(
          selection,
          { baseForm: true, gender },
          (el) => el.baseForm && el.gender === gender
        );
      }
      this.updateSelection(entry, newSelection);
    }
  }

  public isSelected(
    number: number | null,
    form?: PokedexTableForm,
    gender?: PokeGender
  ): boolean {
    if (number) {
      const selection = this.getSelection(number);

      if (form) {
        const { formType, id } = form;
        switch (formType) {
          case PokeFormType.form:
            return !!selection.find(
              (el) => !el.baseForm && el.gender === gender && el.formId === id
            );
          case PokeFormType.regional_form:
            return !!selection.find(
              (el) =>
                !el.baseForm && el.gender === gender && el.regionalForm === id
            );
        }
      } else {
        return !!selection.find((el) => el.baseForm && el.gender === gender);
      }
    }
    return false;
  }
}
