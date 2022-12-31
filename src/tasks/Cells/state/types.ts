import { Signal } from '@preact/signals-react';
import { FormulaNode } from 'tasks/Cells/formula';

type CellPosition = {
  row: number;
  col: number;
};

type Cell = {
  formula: Signal<string>;
  formulaNode: Signal<FormulaNode>;
  isFocused: Signal<boolean>;
};

type State = {
  cells: Cell[][];
};

export type { State, CellPosition, Cell };
