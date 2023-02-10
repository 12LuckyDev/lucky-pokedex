import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { FormComponent } from 'src/app/common';
import { PokedexSearch } from 'src/app/models';
import { PokedexDialogService, PokedexSearchService } from 'src/app/services';
import { PokedexFiltersComponent } from './pokedex-filters/pokedex-filters.component';

@Component({
  selector: 'pokedex-search',
  templateUrl: './pokedex-search.component.html',
})
export class PokedexSearchComponent
  extends FormComponent<PokedexSearch>
  implements OnInit
{
  constructor(
    override fb: FormBuilder,
    private pokedexSearchService: PokedexSearchService,
    private pokedexDialogService: PokedexDialogService
  ) {
    super(fb, {
      textSearch: [null],
      origins: [null],
    });
  }

  ngOnInit(): void {
    this.getControlChanges<string>('textSearch')
      .pipe(debounceTime(300))
      .subscribe((value) => this.pokedexSearchService.changeTextSearch(value));
  }

  public clearSearch() {
    this.clearValue('textSearch');
  }

  public get showCleanSearch() {
    return this.hasValue('textSearch');
  }

  public openFilters() {
    this.pokedexDialogService.open(PokedexFiltersComponent, {}, this.destroyed);
  }
}
