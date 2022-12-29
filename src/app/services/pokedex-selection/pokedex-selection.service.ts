import { toggle } from '@12luckydev/utils';
import { Injectable } from '@angular/core';
import { filter, Subject } from 'rxjs';
import { PokedexBaseService } from 'src/app/common';
import { PokeGender } from 'src/app/enums';
import { PokedexStorageService } from '../pokedex-storage/pokedex-storage.service';
import {
  buildSelection,
  compareSelections,
  getAllSelections,
} from 'src/app/utils';
import {
  PokedexTableEntry,
  PokedexTableVariant,
  SelectionChangeInfo,
  SpecyficSelection,
} from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class PokedexSelectionService extends PokedexBaseService {
  private _selectionMap = new Map<number, SpecyficSelection[]>();
  private _selectionChangeSubject = new Subject<SelectionChangeInfo>();
  public selectionChange$ = this._selectionChangeSubject.asObservable();

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
    entry: PokedexTableEntry,
    variant: PokedexTableVariant,
    gender?: PokeGender
  ): void {
    const selections = this.getSelection(entry.number);
    const newSelection = buildSelection(variant, gender);

    this.updateSelection(
      entry,
      toggle(selections, newSelection, (el) =>
        compareSelections(el, newSelection)
      )
    );
  }

  public isSelected(
    number: number,
    variant: PokedexTableVariant,
    gender?: PokeGender
  ): boolean {
    const selections = this.getSelection(number);
    const toCheck = buildSelection(variant, gender);

    return !!selections.find((el) => compareSelections(el, toCheck));
  }

  public isAllSelected(entry: PokedexTableEntry): boolean {
    return (
      this.getSelection(entry.number).length === getAllSelections(entry).length
    );
  }

  public isSomeSelected(entry: PokedexTableEntry): boolean {
    return this.getSelection(entry.number).length > 0;
  }

  public selectAll(entry: PokedexTableEntry): void {
    this.updateSelection(entry, getAllSelections(entry));
  }

  public deselectAll(entry: PokedexTableEntry): void {
    this.updateSelection(entry, []);
  }
}
