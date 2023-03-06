import { PokeGame } from 'src/app/enums';
import {
  EvolvesData,
  ObtainableIn,
  PokedexEntry,
  PokedexSearch,
} from 'src/app/models';
import { PokedexFilters } from 'src/app/models/app-logic/pokedex-filters.model';

const checkIfObtainable = (
  gameFilter: PokeGame[],
  obtainableIn?: ObtainableIn[]
) => (obtainableIn ?? []).some(({ game }) => gameFilter.includes(game));

const findForm = (data: PokedexEntry[], number: number, formId: number) => {
  const pokemon = data.find((p) => p.number === number);
  const form = pokemon?.forms.find((f) => f.id === formId);
  return form;
};

const checkIfPreEvosIsObtainable = (
  data: PokedexEntry[],
  gameFilter: PokeGame[],
  evolvesFrom?: EvolvesData[]
): boolean => {
  if (evolvesFrom) {
    return evolvesFrom.some(({ number, formId }) => {
      const form = findForm(data, number, formId);
      return checkIfObtainable(gameFilter, form?.obtainableIn)
        ? true
        : checkIfPreEvosIsObtainable(data, gameFilter, form?.evolvesFrom);
    });
  }

  return false;
};

const checkIfOtherFormsObtainable = (
  gameFilter: PokeGame[],
  entry: PokedexEntry
) => {
  const { formsData, forms } = entry;
  if (formsData?.interchandable) {
    return forms.some(({ obtainableIn }) =>
      checkIfObtainable(gameFilter, obtainableIn)
    );
  }
  return false;
};

const filterObtainableIn = (
  data: PokedexEntry[],
  filters: PokedexFilters
): PokedexEntry[] => {
  const {
    obtainableIn: gameFilter,
    applyEvolutionToObtainableIn,
    applyFormsChangeToObtainableIn,
  } = filters;

  if (gameFilter.length > 0) {
    return data
      .map((entry) => {
        const { forms } = entry;
        return {
          ...entry,
          forms: forms.filter(({ obtainableIn, evolvesFrom }) => {
            if (checkIfObtainable(gameFilter, obtainableIn)) {
              return true;
            }

            if (
              applyEvolutionToObtainableIn &&
              checkIfPreEvosIsObtainable(data, gameFilter, evolvesFrom)
            ) {
              return true;
            }

            return (
              applyFormsChangeToObtainableIn &&
              checkIfOtherFormsObtainable(gameFilter, entry)
            );
          }),
        };
      })
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
  const { origins } = filters;

  return filterObtainableIn(data, filters).filter(({ name, origin }) => {
    const nameSearchRule =
      !textSearch ||
      name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase());

    if (!nameSearchRule) {
      return false;
    }

    const originsRule: boolean =
      origins.length === 0 || origins?.includes(origin);

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
