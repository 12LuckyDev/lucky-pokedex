import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { PokedexEntry } from 'src/app/models';
import { PokedexOptionsService, PokedexService } from 'src/app/services';
import { PokedexTableForm } from 'src/app/models/pokedex-table-form.model';
import { getPagedData } from 'src/app/utils';
import { PokedexBaseDatasource } from 'src/app/base';

export class FormsTableDataSource extends PokedexBaseDatasource<PokedexTableForm> {
  private _data: PokedexTableForm[];

  constructor(
    private _pokedexService: PokedexService,
    private _pokedexOptionsService: PokedexOptionsService,
    private _paginator: MatPaginator,
    private _entry: PokedexEntry
  ) {
    super();
    this._data = this._pokedexService.getTableFormsList(this._entry);
  }

  connect(): Observable<PokedexTableForm[]> {
    this._subscriptions.add(
      this._pokedexOptionsService.getOptionsObservable().subscribe(() => {
        this._data = this._pokedexService.getTableFormsList(this._entry);
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
