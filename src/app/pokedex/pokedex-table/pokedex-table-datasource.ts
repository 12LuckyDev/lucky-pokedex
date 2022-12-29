import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { PokedexTableEntry } from '../../models';
import {
  GetPokedexListParamsType,
  PokedexOptionsService,
  PokedexSearchService,
  PokedexDataService,
} from '../../services';
import { PokedexBaseDatasource } from 'src/app/common';

export class PokedexTableDataSource extends PokedexBaseDatasource<PokedexTableEntry> {
  constructor(
    private _pokedexDataService: PokedexDataService,
    private _pokedexSearchService: PokedexSearchService,
    private _pokedexOptionsService: PokedexOptionsService,
    private _paginator: MatPaginator,
    private _sort: MatSort
  ) {
    super();
  }

  connect(): Observable<PokedexTableEntry[]> {
    this._subscriptions.add(
      this._pokedexSearchService.searchObservable.subscribe(() => {
        if (this._paginator.pageIndex !== 0) {
          this._paginator.firstPage();
        }
        this.query();
      })
    );

    this._subscriptions.add(this._paginator.page.subscribe(this.query));
    this._subscriptions.add(this._sort.sortChange.subscribe(this.query));
    this._subscriptions.add(
      this._pokedexOptionsService.optionsObservable.subscribe(this.query)
    );
    return this._dataSubject.asObservable();
  }

  query = (): void => {
    this._pokedexDataService
      .getTableEntries(this.queryParam)
      .subscribe(({ data, count }) => {
        this._dataSubject.next(data);
        this._countSubject.next(count);
      });
  };

  private get queryParam() {
    const params: GetPokedexListParamsType = {
      search: this._pokedexSearchService.search ?? null,
    };
    params.pageIndex = this._paginator.pageIndex;
    params.pageSize = this._paginator.pageSize;
    params.sortBy = this._sort.active;
    params.sortDirection = this._sort.direction;
    return params;
  }
}
