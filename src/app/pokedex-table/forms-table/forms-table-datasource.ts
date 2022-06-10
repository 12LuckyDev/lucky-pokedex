import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { PokedexEntry } from 'src/app/models';
import { PokedexOptionsService } from 'src/app/services';
import { PokedexTableForm } from 'src/app/models/pokedex-table-form.model';
import { PokeFormType, PokeRegionalForm } from 'src/app/enums';
import { getPagedData } from 'src/app/utils';
import { PokedexBaseDatasource } from 'src/app/base';

export class FormsTableDataSource extends PokedexBaseDatasource<PokedexTableForm> {
  constructor(
    private _pokedexOptionsService: PokedexOptionsService,
    private _paginator: MatPaginator,
    private _entry: PokedexEntry
  ) {
    super();
  }

  connect(): Observable<PokedexTableForm[]> {
    this._subscriptions.add(
      this._pokedexOptionsService.getOptionsObservable().subscribe(this.query)
    );

    this._subscriptions.add(this._paginator.page.subscribe(this.query));

    return this._dataSubject.asObservable();
  }

  query = (): void => {
    const data: PokedexTableForm[] = [];
    const { formsData, regionalForms, name } = this._entry;

    if (formsData && this._pokedexOptionsService.getShowForms(this._entry)) {
      formsData.forms.forEach((form) =>
        data.push({ ...form, formType: PokeFormType.form })
      );
    }

    if (
      regionalForms &&
      this._pokedexOptionsService.getShowRegionalForms(this._entry)
    ) {
      regionalForms.forEach(({ region, types, imgPath, genderDiffs }) =>
        data.push({
          id: region,
          types,
          imgPath,
          genderDiffs,
          formType: PokeFormType.regional_form,
          formName: `${PokeRegionalForm[region]} ${name}`,
        })
      );
    }

    this._dataSubject.next(
      getPagedData(data, this._paginator.pageIndex, this._paginator.pageSize)
    );
    this._countSubject.next(data.length);
  };
}
