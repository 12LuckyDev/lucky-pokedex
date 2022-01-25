import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  CountFormsPolicy,
  CountGendersPolicy,
  CountRegionalFormsPolicy,
} from 'src/app/enums';
import { PokedexOptions } from 'src/app/models';

const DEFAULT_OPTIONS: PokedexOptions = {
  countFormsPolicy: CountFormsPolicy.COUNT_ALL,
  countRegionalFormsPolicy: CountRegionalFormsPolicy.COUNT_ALL,
  countGendersPolicy: CountGendersPolicy.NO_COUNT,
};

@Injectable({
  providedIn: 'root',
})
export class PokedexOptionsService {
  private _optionsSubject = new BehaviorSubject<PokedexOptions>(
    DEFAULT_OPTIONS
  );

  constructor() {}

  public get optionsSubject(): BehaviorSubject<PokedexOptions> {
    return this._optionsSubject;
  }

  public get options(): PokedexOptions {
    return this._optionsSubject.value;
  }

  public nextOptions(options: PokedexOptions) {
    this._optionsSubject.next(options);
  }
}