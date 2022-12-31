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

  cell.formulaNode.value = parse(cell.formula.value);
  cell.isFocused.value = false;

  console.log('c', cell);
}

export { onCellEditStart, onCellEdit, onCellEditEnd };
