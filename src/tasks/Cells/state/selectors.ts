import * as formula from '../formula';
import { Cell, State } from './types';

function getCellValue(state: State, cell: Cell): number | undefined {
  const { cells } = state;
  let value = undefined;

  if (cell.formulaNode.value && formula.hasValue(cell.formulaNode.value)) {
    value = formula.evalNode(
      cell.formulaNode.value,
      (row, col) => cells[row][col].formulaNode.value
    );
  }

  return value;
}

export { getCellValue };
