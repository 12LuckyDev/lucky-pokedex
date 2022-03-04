import {
  CountFormsPolicy,
  CountGendersPolicy,
  CountRegionalFormsPolicy,
} from '../enums';

export interface PokedexOptions {
  countFormsPolicy: CountFormsPolicy | null;
  countRegionalFormsPolicy: CountRegionalFormsPolicy | null;
  countGendersPolicy: CountGendersPolicy | null;
}
