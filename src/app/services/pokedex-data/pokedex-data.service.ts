import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PokedexEntry } from '../../models';
import POKEDEX_LIST from './pokedex-data.json';

export type GetPokedexListParamsType = {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
};

@Injectable({
  providedIn: 'root',
})
export class PokedexDataService {
  constructor() {}
  getPokedexList({
    pageIndex = 0,
    pageSize = 10,
    sortBy,
    sortDirection,
  }: GetPokedexListParamsType = {}): Observable<{
    data: PokedexEntry[];
    count: number;
  }> {
    return of({
      data: getPagedPokedexList(
        getSortedPokedexList(POKEDEX_LIST, sortBy, sortDirection),
        pageIndex,
        pageSize
      ),
      count: POKEDEX_LIST.length,
    });
  }
}

function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

function getPagedPokedexList(
  data: PokedexEntry[],
  pageIndex: number,
  pageSize: number
) {
  const start = pageIndex * pageSize;
  return data.slice(start, start + pageSize);
}

function getSortedPokedexList(
  data: PokedexEntry[],
  sortBy?: string,
  sortDirection?: string
) {
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
}
