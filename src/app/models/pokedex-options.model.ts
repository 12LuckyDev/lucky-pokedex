import {
  CountAlphaPolicy,
  CountFormsPolicy,
  CountGendersPolicy,
  CountGigantamaxPolicy,
  CountRegionalFormsPolicy,
} from '../enums';

export interface PokedexOptions {
  countFormsPolicy: CountFormsPolicy | null;
  countRegionalFormsPolicy: CountRegionalFormsPolicy | null;
  countGendersPolicy: CountGendersPolicy | null;
  countGigantamaxPolicy: CountGigantamaxPolicy | null;
  countAlphaPolicy: CountAlphaPolicy | null;
}
