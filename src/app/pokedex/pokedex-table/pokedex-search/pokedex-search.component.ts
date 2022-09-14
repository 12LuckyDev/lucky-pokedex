import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormComponent } from 'src/app/common';
import { PokedexSearch } from 'src/app/models';
import { PokedexSearchService } from 'src/app/services';

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
    private pokedexSearchService: PokedexSearchService
  ) {
    super(fb, {
      textSearch: [null],
    });
  }

  ngOnInit(): void {
    this.formChanges.subscribe(() => {
      this.pokedexSearchService.nextSearch(this.buildModel());
    });
  }

  public clearSearch() {
    this.clearValue('textSearch');
  }

  public get showCleanSearch() {
    return this.hasValue('textSearch');
  }
}
