import { DataSource } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { PokedexRegionalFormEntry } from 'src/app/models';

/**
 * Data source for the RegionalFormsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RegionalFormsTableDataSource extends DataSource<PokedexRegionalFormEntry> {
  data: PokedexRegionalFormEntry[] = [];
  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PokedexRegionalFormEntry[]> {
    return of(this.data);
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}
}
