import { PokedexEntry, PokedexSearch } from 'src/app/models';

export const getSearchData = (
  data: PokedexEntry[],
  search: PokedexSearch | null
) => {
  return search
    ? data.filter(({ name }) => {
        return name
          .toLocaleLowerCase()
          .includes((search.textSearch ?? '').toLocaleLowerCase());
      })
    : data;
};
export const getPagedPokedexList = (
  data: PokedexEntry[],
  pageIndex: number,
  pageSize: number
) => {
  const start = pageIndex * pageSize;
  return data.slice(start, start + pageSize);
};

export const getSortedPokedexList = (
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
