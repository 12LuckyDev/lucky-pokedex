import { Component, OnInit } from '@angular/core';
import { takeUntil, filter } from 'rxjs';
import { PokedexBaseComponent } from 'src/app/common';
import { PokedexSelectionService, PokedexService } from 'src/app/services';

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

  constructor(
    private pokedexService: PokedexService,
    private pokedexSelectionService: PokedexSelectionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.refreshSelectedFields();
    this.pokedexSelectionService.selectionChangeObservable
      .pipe(
        takeUntil(this.destroyed),
        filter(({ entry }) => entry.number === this.number)
      )
      .subscribe(this.refreshSelectedFields);
  }

  private refreshSelectedFields = () => {
    this._isAllSelected = this.pokedexService.isAllSelected(this.entry);
    this._isSomeSelected = this._isAllSelected
      ? false
      : this.pokedexService.isSomeSelected(this.entry);
  };

  public get isAllSelected(): boolean {
    return this._isAllSelected;
  }

  public get isSomeSelected(): boolean {
    return this._isSomeSelected;
  }

  public get showCheckbox(): boolean {
    return this.entry.showGender || this.entry.hasVariants;
  }

  public changeAllSelection() {
    this._isAllSelected
      ? this.pokedexService.deselectAll(this.entry)
      : this.pokedexService.selectAll(this.entry);
  }
}
