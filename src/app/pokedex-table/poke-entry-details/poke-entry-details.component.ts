import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { filter, Subject, takeUntil } from 'rxjs';
import { PokeGender } from 'src/app/enums';
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

  get forms() {
    return this.entry ? this.entry.forms : null;
  }

  get regionalForms() {
    return this.entry ? this.entry.regionalForms : null;
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

  genderSelectionChange(selectedGenders: PokeGender[]) {
    if (this.number !== null && this._selection) {
      this.pokedexSelectionService.updateSelection(this.number, {
        ...this._selection,
        genders: selectedGenders,
      });
    }
  }

  get selectedGenders(): PokeGender[] {
    return this._selection ? this._selection.genders ?? [] : [];
  }
}
