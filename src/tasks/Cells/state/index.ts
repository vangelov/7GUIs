import { signal } from '@preact/signals-react';
import { State, Cell } from './types';

function getInitialCell(): Cell {
  return {
    isFocused: signal(false),
    formula: signal(''),
    formulaNode: signal({ kind: 'text', value: '' })
  };
}

function getInitialState(): State {
  const rows = 9;
  const cols = 4;
  const cells: Cell[][] = [];

  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      if (!cells[i]) {
        cells[i] = [];
      }
      cells[i].push(getInitialCell());
    }
  }

  return {
    cells
  };
}

export { getInitialState };
export * as actions from './actions';
export * from './types';
