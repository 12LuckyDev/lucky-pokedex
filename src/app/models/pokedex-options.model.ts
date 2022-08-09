import {
  CountAlphaPolicy,
  CountFormsPolicy,
  CountGendersPolicy,
  CountGigantamaxPolicy,
  CountRegionalFormsPolicy,
} from '../enums';

export interface PokedexOptions {
  countFormsPolicy: CountFormsPolicy;
  countRegionalFormsPolicy: CountRegionalFormsPolicy;
  countGendersPolicy: CountGendersPolicy;
  countGigantamaxPolicy: CountGigantamaxPolicy;
  countAlphaPolicy: CountAlphaPolicy;
}

export class PokedexOptionsModel implements PokedexOptions {
  countFormsPolicy: CountFormsPolicy;
  countRegionalFormsPolicy: CountRegionalFormsPolicy;
  countGendersPolicy: CountGendersPolicy;
  countGigantamaxPolicy: CountGigantamaxPolicy;
  countAlphaPolicy: CountAlphaPolicy;

  constructor() {
    this.countFormsPolicy = CountFormsPolicy.COUNT_ALL;
    this.countRegionalFormsPolicy = CountRegionalFormsPolicy.COUNT;
    this.countGendersPolicy = CountGendersPolicy.NO_COUNT;
    this.countGigantamaxPolicy = CountGigantamaxPolicy.NO_COUNT;
    this.countAlphaPolicy = CountAlphaPolicy.NO_COUNT;
  }
}
