import { Directive, Input } from '@angular/core';
import { PokedexEntry } from 'src/app/models';
import { DestroyedAwareComponent } from './destroyed-aware.component';

@Directive()
export class PokedexBaseComponent extends DestroyedAwareComponent {
  @Input() entry!: PokedexEntry;

  constructor() {
    super();
  }

  public get number(): number | null {
    return this.entry ? this.entry.number : null;
  }
}
