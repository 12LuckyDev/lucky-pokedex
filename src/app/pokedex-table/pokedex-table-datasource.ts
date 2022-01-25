import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  CountFormsPolicy,
  CountGendersPolicy,
  CountRegionalFormsPolicy,
} from '../enums';
import { PokedexEntry, PokedexOptions } from '../models';
import {
  GetPokedexListParamsType,
  PokedexDataService,
} from '../services/pokedex-data/pokedex-data.service';

const DEFAULT_OPTIONS: PokedexOptions = {
  countFormsPolicy: CountFormsPolicy.COUNT_ALL,
  countRegionalFormsPolicy: CountRegionalFormsPolicy.COUNT_ALL,
  countGendersPolicy: CountGendersPolicy.NO_COUNT,
};

export class PokedexTableDataSource extends DataSource<PokedexEntry> {
  data: PokedexEntry[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private _dataSubject = new BehaviorSubject<PokedexEntry[]>([]);
  private _countSubject = new BehaviorSubject<number>(0);
  private _optionsSubject = new BehaviorSubject<PokedexOptions>(
    DEFAULT_OPTIONS
  );

  constructor(private pokedexDataService: PokedexDataService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PokedexEntry[]> {
    this._optionsSubject.subscribe((options) => console.log(options));

    if (this.paginator) {
      this.paginator.page.subscribe(() => this.query());
    }
    if (this.sort) {
      this.sort.sortChange.subscribe(() => this.query());
    }
    return this._dataSubject.asObservable();
  }

  /**
   * Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this._dataSubject.complete();
    this._countSubject.complete();
    this._optionsSubject.complete();
  }

  query(): void {
    this.pokedexDataService
      .getPokedexList(this.queryParam)
      .subscribe(({ data, count }) => {
        this._dataSubject.next(data);
        this._countSubject.next(count);
      });
  }

  get count(): number {
    return this._countSubject.value;
  }

  get optionsSubject(): BehaviorSubject<PokedexOptions> {
    return this._optionsSubject;
  }

  private get queryParam() {
    const params: GetPokedexListParamsType = {};
    if (this.paginator) {
      params.pageIndex = this.paginator.pageIndex;
      params.pageSize = this.paginator.pageSize;
    }
    if (this.sort) {
      params.sortBy = this.sort.active;
      params.sortDirection = this.sort.direction;
    }
    return params;
  }
}
