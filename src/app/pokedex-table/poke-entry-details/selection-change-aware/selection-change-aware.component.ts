import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { PokedexEntry, PokedexSelection } from 'src/app/models';
import { PokedexSelectionService } from 'src/app/services/pokedex-selection/pokedex-selection.service';

@Directive()
export class SelectionChangeAwareComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  private _selection!: PokedexSelection;

  @Input() entry!: PokedexEntry;

  constructor(protected pokedexSelectionService: PokedexSelectionService) {}

  ngOnInit(): void {
    this.updateSelectionModel();

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

  public get destroyed(): Subject<void> {
    return this._destroyed;
  }

  public get number(): number | null {
    return this.entry ? this.entry.number : null;
  }

  public get selection(): PokedexSelection | null {
    return this._selection ? this._selection : null;
  }

  updateSelectionModel(): void {
    if (this.number) {
      this._selection = this.pokedexSelectionService.getSelection(this.number);
    }
  }
}
