import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PokedexEntry, PokedexSearch } from '../../models';
import {
  getPagedPokedexList,
  getSearchData,
  getSortedPokedexList,
} from './pokedex-data-utils';
import POKEDEX_LIST from './pokedex-data.json';

export type GetPokedexListParamsType = {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
  search: PokedexSearch | null;
};

@Injectable({
  providedIn: 'root',
})
export class PokedexDataService {
  constructor() {}

  getPokedexList(
    {
      pageIndex = 0,
      pageSize = 10,
      sortBy,
      sortDirection,
      search,
    }: GetPokedexListParamsType = { search: null }
  ): Observable<{
    data: PokedexEntry[];
    count: number;
  }> {
    const sortedData = getSearchData(POKEDEX_LIST, search);
    return of({
      data: getPagedPokedexList(
        getSortedPokedexList(sortedData, sortBy, sortDirection),
        pageIndex,
        pageSize
      ),
      count: sortedData.length,
    });
  }
}
