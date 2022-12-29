import { SpecyficSelection } from '../models';

export const compareSelections = (
  a: SpecyficSelection,
  b: SpecyficSelection,
  skipGender: boolean = false,
  skipVariety: boolean = false
) => {
  return (
    a.formType === b.formType &&
    a.id === b.id &&
    (skipGender || a.gender === b.gender) &&
    (skipVariety || a.variety === b.variety)
  );
};
