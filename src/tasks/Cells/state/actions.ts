import { CellPosition, State } from './types';
import { parse } from 'tasks/Cells/parsing';

function onCellEditStart(state: State, cellPositon: CellPosition) {
  const { row, col } = cellPositon;
  const cell = state.cells[row][col];

  cell.isFocused.value = true;
}

function onCellEdit(state: State, cellPositon: CellPosition, formula: string) {
  const { row, col } = cellPositon;
  const cell = state.cells[row][col];

  cell.formula.value = formula;
}

function onCellEditEnd(state: State, cellPosition: CellPosition) {
  const { row, col } = cellPosition;
  const cell = state.cells[row][col];

  try {
    cell.formulaNode.value = parse(cell.formula.value);
    cell.errorMessage.value = undefined;
  } catch (error: any) {
    if (error.message) {
      cell.errorMessage.value = error.message;
    }
  }

  cell.isFocused.value = false;
}

export { onCellEditStart, onCellEdit, onCellEditEnd };
