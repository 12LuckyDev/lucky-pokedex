import { toggle } from '@12luckydev/utils';
import { Injectable } from '@angular/core';
import { filter, Observable, Subject } from 'rxjs';
import { PokedexBaseService } from 'src/app/base';
import { PokeGender } from 'src/app/enums';
import {
  PokedexTableEntry,
  PokedexTableVariant,
  SpecyficSelection,
} from 'src/app/models';
import { PokedexStorageService } from '../pokedex-storage/pokedex-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PokedexSelectionService extends PokedexBaseService {
  private _selectionMap = new Map<number, SpecyficSelection[]>();
  private _selectionChangeSubject = new Subject<{
    entry: PokedexTableEntry;
    newSelection: SpecyficSelection[];
    oldSelection: SpecyficSelection[];
    userInput: boolean;
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
    entry: PokedexTableEntry;
    newSelection: SpecyficSelection[];
    oldSelection: SpecyficSelection[];
    userInput: boolean;
  }> {
    return this._selectionChangeSubject.asObservable();
  }

  public getSelection(number: number): SpecyficSelection[] {
    return this._selectionMap.get(number) ?? [];
  }

  public updateSelection(
    entry: PokedexTableEntry,
    newSelection: SpecyficSelection[],
    userInput: boolean = true
  ): void {
    const { number } = entry;
    const oldSelection = this.getSelection(number);

    // console.log(number, newSelection);
    this._selectionMap.set(number, newSelection);
    this.pokedexStorageService.setSelection(number, newSelection).subscribe();
    this._selectionChangeSubject.next({
      entry,
      newSelection,
      oldSelection,
      userInput,
    });
  }

  public changeSelection(
    entry?: PokedexTableEntry,
    form?: PokedexTableVariant,
    gender?: PokeGender
  ): void {
    if (entry) {
      const selection = this.getSelection(entry.number);
      let newSelection = null;

      if (form) {
        const { formType, id } = form;
        newSelection = toggle(
          selection,
          { formType, gender, formId: id },
          (el) =>
            el.formType === formType && el.gender === gender && el.formId === id
        );
      } else {
        newSelection = toggle(
          selection,
          { formType: null, gender },
          (el) => el.formType === null && el.gender === gender
        );
      }
      this.updateSelection(entry, newSelection);
    }
  }

  public isSelected(
    number: number | null,
    form?: PokedexTableVariant,
    gender?: PokeGender
  ): boolean {
    if (number) {
      const selection = this.getSelection(number);

      if (form) {
        const { formType, id } = form;
        return !!selection.find(
          (el) =>
            el.formType === formType && el.gender === gender && el.formId === id
        );
      } else {
        return !!selection.find(
          (el) => el.formType === null && el.gender === gender
        );
      }
    }
    return false;
  }
}
