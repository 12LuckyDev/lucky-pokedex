import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, BehaviorSubject } from 'rxjs';
import { PokedexEntry } from '../models';
import {
  GetPokedexListParamsType,
  PokedexService,
} from '../services/pokedex.service';

/**
 * Data source for the PokedexTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PokedexTableDataSource extends DataSource<PokedexEntry> {
  data: PokedexEntry[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private dataSubject = new BehaviorSubject<PokedexEntry[]>([]);
  private countSubject = new BehaviorSubject<number>(0);

  constructor(private pokedexService: PokedexService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PokedexEntry[]> {
    if (this.paginator) {
      this.paginator.page.subscribe(() => this.query());
    }
    if (this.sort) {
      this.sort.sortChange.subscribe(() => this.query());
    }
    return this.dataSubject.asObservable();
  }

  /**
   * Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.dataSubject.complete();
    this.countSubject.complete();
  }

  query(): void {
    this.pokedexService
      .getPokedexList(this.queryParam)
      .subscribe(({ data, count }) => {
        this.dataSubject.next(data);
        this.countSubject.next(count);
      });
  }

  get count(): number {
    return this.countSubject.value;
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
