import { BehaviorSubject, Observable } from 'rxjs';

export abstract class PokedexBaseService {
  private _readySubject = new BehaviorSubject<{ ready: boolean; name: string }>(
    { ready: false, name: '' }
  );

  protected abstract get serviceName(): string;

  public get readyObservable(): Observable<{ ready: boolean; name: string }> {
    return this._readySubject.asObservable();
  }

  public get isReady(): boolean {
    return this._readySubject.value.ready;
  }

  protected setAsReady = () => {
    if (!this.isReady) {
      this._readySubject.next({ ready: true, name: this.serviceName });
    }
  };
}
