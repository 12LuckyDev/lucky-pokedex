import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Subscription } from 'rxjs';

export abstract class PokedexBaseDatasource<T> extends DataSource<T> {
  protected _dataSubject = new BehaviorSubject<T[]>([]);
  protected _countSubject = new BehaviorSubject<number>(0);

  protected _subscriptions = new Subscription();

  get count(): number {
    return this._countSubject.value;
  }

  disconnect(): void {
    this._subscriptions.unsubscribe();
    this._dataSubject.complete();
    this._countSubject.complete();
  }

  protected abstract query: () => void;
}
