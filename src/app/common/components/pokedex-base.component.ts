import { Directive, Input } from '@angular/core';
import { PokedexTableEntry } from 'src/app/models';
import { DestroyedAwareComponent } from './destroyed-aware.component';

@Directive()
export abstract class PokedexBaseComponent extends DestroyedAwareComponent {
  @Input() entry!: PokedexTableEntry;

  constructor() {
    super();
  }

  public get number(): number {
    return this.entry.number;
  }
}
