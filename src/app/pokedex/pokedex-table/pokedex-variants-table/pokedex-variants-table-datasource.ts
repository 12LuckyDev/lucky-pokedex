import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { PokedexEntry, PokedexTableVariant } from 'src/app/models';
import { PokedexOptionsService, PokedexService } from 'src/app/services';
import { getPagedData } from 'src/app/utils';
import { PokedexBaseDatasource } from 'src/app/common';

export class PokedexVariantsTableDataSource extends PokedexBaseDatasource<PokedexTableVariant> {
  private _data: PokedexTableVariant[];

  constructor(
    private _pokedexService: PokedexService,
    private _pokedexOptionsService: PokedexOptionsService,
    private _paginator: MatPaginator,
    private _entry: PokedexEntry
  ) {
    super();
    this._data = this._pokedexService.getTableVariantsList(this._entry);
  }

  connect(): Observable<PokedexTableVariant[]> {
    this._subscriptions.add(
      this._pokedexOptionsService.optionsObservable.subscribe(() => {
        this._data = this._pokedexService.getTableVariantsList(this._entry);
        this.query();
      })
    );

    this._subscriptions.add(this._paginator.page.subscribe(this.query));

    return this._dataSubject.asObservable();
  }

  query = (): void => {
    this._dataSubject.next(
      getPagedData(
        this._data,
        this._paginator.pageIndex,
        this._paginator.pageSize
      )
    );
    this._countSubject.next(this._data.length);
  };
}
