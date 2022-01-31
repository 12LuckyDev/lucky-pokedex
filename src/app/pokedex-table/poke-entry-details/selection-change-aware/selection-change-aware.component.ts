import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { PokedexEntry } from 'src/app/models';
import {
  PokedexSelectionModel,
  PokedexSelectionService,
} from 'src/app/services/pokedex-selection/pokedex-options/pokedex-selection.service';

@Directive()
export class SelectionChangeAwareComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private _selection!: PokedexSelectionModel;

  @Input() entry!: PokedexEntry;

  constructor(protected pokedexSelectionService: PokedexSelectionService) {}

  ngOnInit(): void {
    this.updateSelectionModel();

    // TODO add rerender source
    this.pokedexSelectionService.selectionChangeObservable
      .pipe(
        takeUntil(this._destroyed),
        filter((value: number) => value === this.number)
      )
      .subscribe(() => this.updateSelectionModel());
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public get number(): number | null {
    return this.entry ? this.entry.number : null;
  }

  public get selection(): PokedexSelectionModel | null {
    return this._selection ? this._selection : null;
  }

  updateSelectionModel(): void {
    if (this.number) {
      this._selection = this.pokedexSelectionService.getSelection(this.number);
    }
  }
}
