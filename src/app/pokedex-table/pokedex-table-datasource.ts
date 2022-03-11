import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { PokedexEntry } from '../models';
import {
  GetPokedexListParamsType,
  PokedexDataService,
  PokedexOptionsService,
  PokedexSearchService,
} from '../services';

export class PokedexTableDataSource extends DataSource<PokedexEntry> {
  data: PokedexEntry[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private _dataSubject = new BehaviorSubject<PokedexEntry[]>([]);
  private _countSubject = new BehaviorSubject<number>(0);
  private optionsSubscription!: Subscription;
  private searchSubscription!: Subscription;

  constructor(
    private pokedexDataService: PokedexDataService,
    private pokedexOptionsService: PokedexOptionsService,
    private pokedexSearchService: PokedexSearchService
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PokedexEntry[]> {
    this.optionsSubscription =
      this.pokedexOptionsService.optionsObservable.subscribe((options) =>
        console.log(options)
      );

    this.searchSubscription =
      this.pokedexSearchService.searchObservable.subscribe(() => {
        if (this.paginator?.pageIndex !== 0) {
          this.paginator?.firstPage();
        }
        this.query();
      });

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
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.optionsSubscription) {
      this.optionsSubscription.unsubscribe();
    }
  }

  query(): void {
    this.pokedexDataService
      .getPokedexList(this.queryParam)
      .subscribe(({ data, count }) => {
        this._dataSubject.next(data);
        // TODO change dynamically
        this._countSubject.next(count);
      });
  }

  get count(): number {
    return this._countSubject.value;
  }

  private get queryParam() {
    const params: GetPokedexListParamsType = {
      search: this.pokedexSearchService.search ?? null,
    };
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
