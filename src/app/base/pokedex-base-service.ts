import { BehaviorSubject, Observable } from 'rxjs';

export abstract class PokedexBaseService {
  private _readySubject = new BehaviorSubject<boolean>(false);

  public get readyObservable(): Observable<boolean> {
    return this._readySubject.asObservable();
  }

  protected setAsReady = () => {
    if (!this._readySubject.value) {
      this._readySubject.next(true);
    }
  };
}
