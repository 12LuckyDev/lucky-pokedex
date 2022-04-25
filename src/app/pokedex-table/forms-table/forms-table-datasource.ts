import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, BehaviorSubject, Subscription, skip } from 'rxjs';
import { PokedexEntry } from 'src/app/models';
import { PokedexOptionsService } from 'src/app/services';
import { PokedexTableForm } from 'src/app/models/pokedex-table-form.model';
import {
  CountFormsPolicy,
  CountRegionalFormsPolicy,
  PokeFormType,
  PokeRegion,
  PokeRegionalForm,
} from 'src/app/enums';

export class FormsTableDataSource extends DataSource<PokedexTableForm> {
  data: PokedexTableForm[] = [];
  paginator: MatPaginator | undefined;

  private _subscriptions = new Subscription();

  private _dataSubject = new BehaviorSubject<PokedexTableForm[]>([]);
  private _countSubject = new BehaviorSubject<number>(0);
  private _entry: PokedexEntry | null = null;

  constructor(private pokedexOptionsService: PokedexOptionsService) {
    super();
  }

  public set entry(entry: PokedexEntry) {
    this._entry = entry;
  }

  connect(): Observable<PokedexTableForm[]> {
    this._subscriptions.add(
      this.pokedexOptionsService.getOptionsObservable().subscribe(() => {
        this.query();
      })
    );

    if (this.paginator) {
      this._subscriptions.add(
        this.paginator.page.subscribe(() => {
          this.query();
        })
      );
    }

    return this._dataSubject.asObservable();
  }

  disconnect(): void {
    this._subscriptions.unsubscribe();
  }

  query(): void {
    const data: PokedexTableForm[] = [];
    if (this._entry) {
      console.log('query', this._entry.name);
      const { countFormsPolicy, countRegionalFormsPolicy } =
        this.pokedexOptionsService.options;

      const { forms, formDiffsOnlyVisual, regionalForms, name } = this._entry;

      if (
        forms &&
        forms.length > 0 &&
        countFormsPolicy !== CountFormsPolicy.NO_COUNT &&
        (countFormsPolicy !== CountFormsPolicy.NO_COUNT_VISUAL_ONLY ||
          !formDiffsOnlyVisual)
      ) {
        forms.forEach((form) =>
          data.push({ ...form, formType: PokeFormType.form })
        );
      }

      if (
        regionalForms &&
        regionalForms.length > 0 &&
        countRegionalFormsPolicy !== CountRegionalFormsPolicy.NO_COUNT
      ) {
        regionalForms.forEach(({ region, types, imgPath }) =>
          data.push({
            id: region,
            types,
            imgPath,
            formType: PokeFormType.regional_form,
            formName: `${PokeRegionalForm[region]} ${name}`,
          })
        );
      }
    }
    this._dataSubject.next(this.getPagedData(data));
    this._countSubject.next(data.length);
  }

  get count(): number {
    return this._countSubject.value;
  }

  private getPagedData(data: PokedexTableForm[]): PokedexTableForm[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }
}
