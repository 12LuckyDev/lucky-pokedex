import { PokeGame } from 'src/app/enums';
import { PokedexEntry, PokedexSearch } from 'src/app/models';

const filterObtainableIn = (
  data: PokedexEntry[],
  gameFilter: PokeGame[]
): PokedexEntry[] => {
  if (gameFilter.length > 0) {
    return data
      .map(({ forms, ...entry }) => ({
        ...entry,
        forms: forms.filter(({ obtainableIn }) =>
          (obtainableIn ?? []).some(({ game }) => gameFilter.includes(game))
        ),
      }))
      .filter(({ forms }) => forms.length);
  }

  return data;
};

export const getSearchData = (
  data: PokedexEntry[],
  search?: PokedexSearch
): PokedexEntry[] => {
  if (!search) {
    return data;
  }

  const { textSearch, filters } = search;
  const { origins, obtainableIn } = filters;

  return filterObtainableIn(data, obtainableIn).filter(({ name, origin }) => {
    const nameSearchRule =
      !textSearch ||
      name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase());

    if (!nameSearchRule) {
      return false;
    }

    const originsRule = origins.length === 0 || origins?.includes(origin);

    return originsRule;
  });
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
