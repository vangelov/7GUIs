import { Signal } from '@preact/signals-react';
import { FormulaNode } from 'tasks/Cells/formula';

type CellPosition = {
  row: number;
  col: number;
};

type Cell = {
  formula?: string;
  formulaNode?: FormulaNode;
  isFocused?: boolean;
};

type State = {
  cells: Signal<Cell>[][];
};

export type { State, CellPosition, Cell };
