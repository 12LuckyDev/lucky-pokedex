import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { PokedexTableEntry, PokedexTableVariant } from 'src/app/models';
import { PokedexOptionsService } from 'src/app/services';
import { getPagedData } from 'src/app/utils';
import { PokedexBaseDatasource } from 'src/app/common';

export class PokedexVariantsTableDataSource extends PokedexBaseDatasource<PokedexTableVariant> {
  private _data: PokedexTableVariant[];

  constructor(
    private _pokedexOptionsService: PokedexOptionsService,
    private _paginator: MatPaginator,
    private _entry: PokedexTableEntry
  ) {
    super();
    this._data = this.getDataByRef();
  }

  private getDataByRef() {
    return this._entry.showForms
      ? this._entry.variants
      : this._entry.variants.filter(({ id, variety }) => {
          const baseFormId = this._entry.formsData?.baseFormId ?? 1;
          return id !== baseFormId || typeof variety === 'number';
        });
  }

  connect(): Observable<PokedexTableVariant[]> {
    this._subscriptions.add(
      this._pokedexOptionsService.optionsObservable.subscribe(() => {
        this._data = this.getDataByRef();
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
