import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class DestroyedAwareComponent implements OnDestroy {
  private readonly _destroyed = new Subject<void>();

  constructor() {}

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public get destroyed(): Subject<void> {
    return this._destroyed;
  }
}
