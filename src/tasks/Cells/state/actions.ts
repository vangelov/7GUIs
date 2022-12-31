import { CellPosition, State } from './types';
import { parse } from 'tasks/Cells/parsing';

function onCellEditStart(state: State, cellPositon: CellPosition) {
  const { row, col } = cellPositon;
  const cell = state.cells[row][col];

  cell.value = {
    ...cell.value,
    isFocused: true
  };
}

function onCellEdit(state: State, cellPositon: CellPosition, formula: string) {
  const { row, col } = cellPositon;
  const cell = state.cells[row][col];

  cell.value = {
    ...cell.value,
    formula
  };
}

function onCellEditEnd(state: State, cellPosition: CellPosition) {
  const { row, col } = cellPosition;
  const cell = state.cells[row][col];
  const { formula } = cell.value;

  if (formula) {
    const formulaNode = parse(formula);

    cell.value = {
      ...cell.value,
      formulaNode,
      isFocused: false
    };
  } else {
    cell.value = {
      ...cell.value,
      isFocused: false
    };
  }
}

export { onCellEditStart, onCellEdit, onCellEditEnd };
