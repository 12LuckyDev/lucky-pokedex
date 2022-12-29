import { Component, OnInit } from '@angular/core';
import { takeUntil, filter } from 'rxjs';
import { PokedexBaseComponent } from 'src/app/common';
import { PokedexSelectionService } from 'src/app/services';

@Component({
  selector: 'pokedex-selection-all',
  templateUrl: './pokedex-selection-all.component.html',
})
export class PokedexSelectionAllComponent
  extends PokedexBaseComponent
  implements OnInit
{
  private _isAllSelected: boolean = false;
  private _isSomeSelected: boolean = false;

  constructor(private pokedexSelectionService: PokedexSelectionService) {
    super();
  }

  ngOnInit(): void {
    this.refreshSelectedFields();
    this.pokedexSelectionService.selectionChange$
      .pipe(
        takeUntil(this.destroyed),
        filter(({ entry }) => entry.number === this.number)
      )
      .subscribe(this.refreshSelectedFields);
  }

  private refreshSelectedFields = () => {
    this._isAllSelected = this.pokedexSelectionService.isAllSelected(
      this.entry
    );
    this._isSomeSelected = this._isAllSelected
      ? false
      : this.pokedexSelectionService.isSomeSelected(this.entry);
  };

  public get isAllSelected(): boolean {
    return this._isAllSelected;
  }

  public get isSomeSelected(): boolean {
    return this._isSomeSelected;
  }

  public get showCheckbox(): boolean {
    return (
      this.entry.variants.map(({ showGender }) => showGender).includes(true) ||
      this.entry.variants.length > 1
    );
  }

  public changeAllSelection() {
    this._isAllSelected
      ? this.pokedexSelectionService.deselectAll(this.entry)
      : this.pokedexSelectionService.selectAll(this.entry);
  }
}
