import { Component, OnInit } from '@angular/core';
import { takeUntil, filter } from 'rxjs';
import {
  PokedexOptionsService,
  PokedexSelectionService,
} from 'src/app/services';
import { PokedexBaseComponent } from '../pokedex-base-component/pokedex-base.component';

@Component({
  selector: 'app-poke-selection-all',
  templateUrl: './poke-selection-all.component.html',
  styleUrls: ['./poke-selection-all.component.scss'],
})
export class PokeSelectionAllComponent
  extends PokedexBaseComponent
  implements OnInit
{
  private _isAllSelected: boolean = false;
  private _isSomeSelected: boolean = false;

  constructor(
    private pokedexSelectionService: PokedexSelectionService,
    private pokedexOptionsService: PokedexOptionsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.refreshSelectedFields();
    this.pokedexSelectionService.selectionChangeObservable
      .pipe(
        takeUntil(this.destroyed),
        filter((number: number) => number === this.number)
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
    return this.pokedexOptionsService.getShowSelectAllCheckbox(this.entry);
  }

  public changeAllSelection() {
    this._isAllSelected
      ? this.pokedexSelectionService.deselectAll(this.entry)
      : this.pokedexSelectionService.selectAll(this.entry);
  }
}
