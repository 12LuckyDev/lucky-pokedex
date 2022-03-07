import { Directive, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { PokedexEntry } from 'src/app/models';

@Directive()
export class PokedexBaseComponent implements OnDestroy {
  private readonly _destroyed = new Subject<void>();

  @Input() entry!: PokedexEntry;

  constructor() {}

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  public get destroyed(): Subject<void> {
    return this._destroyed;
  }

  public get number(): number | null {
    return this.entry ? this.entry.number : null;
  }
}
