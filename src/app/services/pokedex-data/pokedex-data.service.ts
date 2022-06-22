import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { getPagedData } from 'src/app/utils';
import { PokedexEntry, PokedexSearch } from '../../models';
import { getSearchData, getSortedPokedexList } from './pokedex-data-utils';
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
      pageSize,
      sortBy,
      sortDirection,
      search,
    }: GetPokedexListParamsType = { search: null }
  ): Observable<{
    data: PokedexEntry[];
    count: number;
  }> {
    const sortedData = getSortedPokedexList(
      getSearchData(POKEDEX_LIST, search),
      sortBy,
      sortDirection
    );
    return of({
      data: pageSize
        ? getPagedData(sortedData, pageIndex, pageSize)
        : sortedData,
      count: sortedData.length,
    });
  }
}
