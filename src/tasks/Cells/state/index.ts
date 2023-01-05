import { signal } from '@preact/signals-react';
import { parse } from 'tasks/Cells/parsing';
import { stringifyCoord } from '../coords';
import { State, Cell } from './types';

const predefinedFormulasMap: Record<string, string> = {
  A1: '1',
  A2: '2',
  A3: '3',
  B1: '=sum(A1:A3)',
  B2: '=mul(A1:A3)',
  C1: '=add(A1,A2)'
};

function getCell(row: number, col: number): Cell {
  const coord = stringifyCoord({ row, col });
  const formula = predefinedFormulasMap[coord] || '';

  return {
    isFocused: signal(false),
    formula: signal(formula),
    formulaNode: signal(parse(formula)),
    errorMessage: signal(undefined)
  };
}

function getInitialState(): State {
  const rows = 9;
  const cols = 4;
  const cells: Cell[][] = [];

  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      if (!cells[i]) cells[i] = [];
      cells[i].push(getCell(i, j));
    }
  }

  return {
    cells
  };
}

export { getInitialState };
export * as actions from './actions';
export * as selectors from './selectors';
export * from './types';
