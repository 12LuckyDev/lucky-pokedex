import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { PokeFormType, PokeVariety, RefersToType } from 'src/app/enums';
import { formatRegionalName, formatVariety, getPagedData } from 'src/app/utils';
import {
  PokedexEntry,
  PokedexFormEntry,
  PokedexSearch,
  PokedexTableEntry,
  PokedexTableVariant,
} from '../../models';
import { PokedexOptionsService } from '../pokedex-options/pokedex-options.service';
import { getSearchData, getSortedPokedexList } from './pokedex-data-utils';
import POKEDEX_LIST from './pokedex-data.json';

export type GetPokedexListParamsType = {
  pageIndex?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
  search?: PokedexSearch;
};

@Injectable({
  providedIn: 'root',
})
export class PokedexDataService {
  constructor(private pokedexOptionsService: PokedexOptionsService) {}

  private getPokedexList({
    pageIndex = 0,
    pageSize,
    sortBy,
    sortDirection,
    search,
  }: GetPokedexListParamsType = {}): Observable<{
    data: PokedexEntry[];
    count: number;
  }> {
    // TODO store sorted data
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

  public getTableEntries(
    requestData: GetPokedexListParamsType = {}
  ): Observable<{
    data: PokedexTableEntry[];
    count: number;
  }> {
    return this.getPokedexList(requestData).pipe(
      map(({ data, count }) => {
        return {
          count,
          data: data.map((entry: PokedexEntry): PokedexTableEntry => {
            return {
              ...entry,
              variants: this.getTableVariantsList(entry),
              showForms: this.pokedexOptionsService.getShowForms(entry),
            };
          }),
        };
      })
    );
  }

  private getTableVariantsList(entry: PokedexEntry): PokedexTableVariant[] {
    const variants: PokedexTableVariant[] = [];
    const { forms, formsData, name } = entry;

    this.pokedexOptionsService
      .filterForms(forms, formsData)
      .forEach((form: PokedexFormEntry) => {
        const { varieties, ...rest } = form;
        variants.push({
          ...rest,
          showGender: this.pokedexOptionsService.getVariantShowGenders(form),
          formName: buildVariantName(name, form),
        });
        if (varieties) {
          this.pokedexOptionsService
            .filterVarieties(varieties, formsData)
            .forEach(({ variety, refersTo }) => {
              if (
                refersTo === RefersToType.TO_ALL ||
                (refersTo === RefersToType.TO_BASE &&
                  form.id === (formsData?.baseFormId ?? 1))
              ) {
                variants.push({
                  ...rest,
                  showGender: this.pokedexOptionsService.getVariantShowGenders(
                    form,
                    variety
                  ),
                  formName: buildVariantName(
                    name,
                    form,
                    variety,
                    refersTo === RefersToType.TO_ALL
                  ),
                  variety,
                });
              }
            });
        }
      });

    return variants;
  }
}

const buildVariantName = (
  name: string,
  form: PokedexFormEntry,
  variety?: PokeVariety,
  applyFormName: boolean = true
): string => {
  const isVariety = typeof variety === 'number';
  const { formType, region, formName } = form;
  let pokeName = null;
  switch (formType) {
    case PokeFormType.base:
      pokeName = name;
      break;
    case PokeFormType.form:
      pokeName = isVariety
        ? applyFormName
          ? `${formName} ${name}`
          : name
        : formName ?? name;
      break;
    case PokeFormType.regional_form:
      pokeName = region ? `${formatRegionalName(region)} ${name}` : name;
      break;
  }

  return isVariety ? `${formatVariety(variety)} ${pokeName}` : pokeName;
};
