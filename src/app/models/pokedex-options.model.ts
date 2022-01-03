import {
  CountFormsPolicy,
  CountGendersPolicy,
  CountRegionalFormsPolicy,
} from '../enums';

export interface PokedexOptions {
  countFormsPolicy: CountFormsPolicy;
  countRegionalFormsPolicy: CountRegionalFormsPolicy;
  countGendersPolicy: CountGendersPolicy;
}
