import { EntryForStatistics, SpecyficSelection } from '../models';
import { compareSelections } from './compare-selections-utils';

export const calcNewSelection = ({
  allSelection,
  selection: oldSelection,
}: EntryForStatistics): SpecyficSelection[] => {
  const newSelection: SpecyficSelection[] = [];

  allSelection.forEach((selection) => {
    const { gender, variety } = selection;

    if (
      oldSelection.find((el) =>
        compareSelections(
          el,
          selection,
          typeof gender !== 'number',
          typeof variety !== 'number'
        )
      )
    ) {
      newSelection.push(selection);
    }
  });

  return newSelection;
};
