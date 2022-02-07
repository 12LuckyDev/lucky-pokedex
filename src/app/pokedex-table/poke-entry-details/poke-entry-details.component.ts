import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { PokedexEntry } from 'src/app/models';
import {
  PokedexSelectionModel,
  PokedexSelectionService,
} from 'src/app/services/pokedex-selection/pokedex-options/pokedex-selection.service';

@Component({
  selector: 'app-poke-entry-details',
  templateUrl: './poke-entry-details.component.html',
  styleUrls: ['./poke-entry-details.component.scss'],
})
export class PokeEntryDetailsComponent implements OnInit, OnDestroy {
  private readonly _destroyed = new Subject<void>();

  @Input() entry!: PokedexEntry;
  private _selection!: PokedexSelectionModel;

  constructor(private pokedexSelectionService: PokedexSelectionService) {}

  private get number(): number | null {
    return this.entry ? this.entry.number : null;
  }

  get showForm(): boolean {
    return this.entry
      ? this.entry.forms
        ? this.entry.forms.length > 0
        : false
      : false;
  }

  get showRegionalForms() {
    return this.entry
      ? this.entry.regionalForms
        ? this.entry.regionalForms.length > 0
        : false
      : false;
  }

  ngOnInit(): void {
    this.updateSelectionModel();

    this.pokedexSelectionService.selectionChangeObservable
      .pipe(
        takeUntil(this._destroyed),
        filter((value: number) => value === this.number)
      )
      .subscribe(() => this.updateSelectionModel());
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  updateSelectionModel(): void {
    if (this.number) {
      this._selection = this.pokedexSelectionService.getSelection(this.number);
    }
  }
}
