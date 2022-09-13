import {
  CountAlphaPolicy,
  CountFormsPolicy,
  CountGendersPolicy,
  CountGigantamaxPolicy,
  CountRegionalFormsPolicy,
} from 'src/app/enums';

const getPolicyList = <T extends { [key: string]: string }>(policyEnum: T) =>
  Object.keys(policyEnum).map((el) => policyEnum[el]);

export const COUNT_FORMS_POLICY_OPTIONS = getPolicyList(CountFormsPolicy);
export const COUNT_REGIONAL_FORMS_POLICY_OPTIONS = getPolicyList(
  CountRegionalFormsPolicy
);
export const COUNT_GENDERS_POLICY_OPTIONS = getPolicyList(CountGendersPolicy);
export const COUNT_GIGANTAMAX_POLICY_OPTIONS = getPolicyList(
  CountGigantamaxPolicy
);
export const COUNT_ALPHA_POLICY_OPTIONS = getPolicyList(CountAlphaPolicy);
