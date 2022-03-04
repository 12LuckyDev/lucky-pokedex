import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PokedexEntry, PokedexSearch } from '../../models';
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
    return of({
      data: getPagedPokedexList(
        getSortedPokedexList(getSearchData(search), sortBy, sortDirection),
        pageIndex,
        pageSize
      ),
      count: POKEDEX_LIST.length,
    });
  }
}

const getSearchData = (search: PokedexSearch | null) => {
  return search
    ? POKEDEX_LIST.filter(({ name }) => {
        return name
          .toLocaleLowerCase()
          .includes((search.textSearch ?? '').toLocaleLowerCase());
      })
    : POKEDEX_LIST;
};

const getPagedPokedexList = (
  data: PokedexEntry[],
  pageIndex: number,
  pageSize: number
) => {
  const start = pageIndex * pageSize;
  return data.slice(start, start + pageSize);
};

const getSortedPokedexList = (
  data: PokedexEntry[],
  sortBy?: string,
  sortDirection?: string
) => {
  if (!sortBy || sortDirection === '') {
    return data;
  }

  return [...data].sort((a, b) => {
    const isAsc = sortDirection === 'asc';
    switch (sortBy) {
      case 'name':
        return compare(a.name, b.name, isAsc);
      case 'number':
        return compare(+a.number, +b.number, isAsc);
      default:
        return 0;
    }
  });
};

const compare = (
  a: string | number,
  b: string | number,
  isAsc: boolean
): number => {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
};
