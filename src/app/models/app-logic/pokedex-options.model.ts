import {
  CountAlphaPolicy,
  CountFormsPolicy,
  CountGendersPolicy,
  CountGigantamaxPolicy,
  CountRegionalFormsPolicy,
} from '../../enums';

export interface PokedexOptions {
  countFormsPolicy: CountFormsPolicy;
  countRegionalFormsPolicy: CountRegionalFormsPolicy;
  applyGenderPolicyToForms: boolean;
  countGendersPolicy: CountGendersPolicy;
  applyGenderPolicyToRegionalForms: boolean;
  countGigantamaxPolicy: CountGigantamaxPolicy;
  applyGenderPolicyToGigantamax: boolean;
  countAlphaPolicy: CountAlphaPolicy;
  applyGenderPolicyToAlpha: boolean;
}

export class PokedexOptionsModel implements PokedexOptions {
  countFormsPolicy: CountFormsPolicy;
  countRegionalFormsPolicy: CountRegionalFormsPolicy;
  applyGenderPolicyToForms: boolean;
  countGendersPolicy: CountGendersPolicy;
  applyGenderPolicyToRegionalForms: boolean;
  countGigantamaxPolicy: CountGigantamaxPolicy;
  applyGenderPolicyToGigantamax: boolean;
  countAlphaPolicy: CountAlphaPolicy;
  applyGenderPolicyToAlpha: boolean;

  constructor() {
    this.countFormsPolicy = CountFormsPolicy.COUNT_ALL;
    this.countRegionalFormsPolicy = CountRegionalFormsPolicy.COUNT;
    this.applyGenderPolicyToForms = true;
    this.countGendersPolicy = CountGendersPolicy.NO_COUNT;
    this.applyGenderPolicyToRegionalForms = true;
    this.countGigantamaxPolicy = CountGigantamaxPolicy.NO_COUNT;
    this.applyGenderPolicyToGigantamax = true;
    this.countAlphaPolicy = CountAlphaPolicy.NO_COUNT;
    this.applyGenderPolicyToAlpha = true;
  }
}
