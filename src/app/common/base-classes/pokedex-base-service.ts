import { BehaviorSubject, Observable } from 'rxjs';

export abstract class PokedexBaseService {
  private _isReady = false;

  private _readySubject = new BehaviorSubject<string | null>(null);

  protected get serviceName(): string | null {
    return null;
  }

  public get readyObservable(): Observable<string | null> {
    return this._readySubject.asObservable();
  }

  protected setAsReady = () => {
    if (!this._isReady) {
      this._readySubject.next(this.serviceName);
      this._readySubject.complete();
      this._isReady = true;
    }
  };
}
