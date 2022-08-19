import { EntryForStatistics, SpecyficSelection } from '../models';

export const calcNewSelection = ({
  allSelection,
  selection: oldSelection,
}: EntryForStatistics): SpecyficSelection[] => {
  const newSelection: SpecyficSelection[] = [];

  allSelection.forEach((selection) => {
    const { formType, gender, formId } = selection;
    if (
      typeof selection.gender === 'number'
        ? oldSelection.find(
            (el) =>
              el.formType === formType &&
              el.formId === formId &&
              el.gender === gender
          )
        : oldSelection.find(
            (el) => el.formType === formType && el.formId === formId
          )
    ) {
      newSelection.push(selection);
    }
  });
  return newSelection;
};
