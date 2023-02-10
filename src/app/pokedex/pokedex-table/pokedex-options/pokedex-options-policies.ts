import {
  CountAlphaPolicy,
  CountFormsPolicy,
  CountGendersPolicy,
  CountGigantamaxPolicy,
  CountRegionalFormsPolicy,
} from 'src/app/enums';
import { getEnumList } from 'src/app/utils';

export const COUNT_FORMS_POLICY_OPTIONS = getEnumList(CountFormsPolicy);
export const COUNT_REGIONAL_FORMS_POLICY_OPTIONS = getEnumList(
  CountRegionalFormsPolicy
);
export const COUNT_GENDERS_POLICY_OPTIONS = getEnumList(CountGendersPolicy);
export const COUNT_GIGANTAMAX_POLICY_OPTIONS = getEnumList(
  CountGigantamaxPolicy
);
export const COUNT_ALPHA_POLICY_OPTIONS = getEnumList(CountAlphaPolicy);
