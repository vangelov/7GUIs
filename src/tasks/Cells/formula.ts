import { Signal } from '@preact/signals-react';

type NumberNode = {
  kind: 'number';
  value: number;
};

type TextNode = {
  kind: 'text';
  value: string;
};

type CoordNode = {
  kind: 'coord';
  row: number;
  col: number;
};

type RangeNode = {
  kind: 'range';
  startCoord: CoordNode;
  endCoord: CoordNode;
};

type OperationNode = {
  kind: 'operation';
  operator: Operator;
  args: FormulaNode[];
};

type FormulaNode =
  | NumberNode
  | TextNode
  | CoordNode
  | RangeNode
  | OperationNode;

type Cells = Signal<FormulaNode>[][];

type Operator = 'add' | 'sub' | 'div' | 'mul' | 'mod' | 'mod' | 'sum' | 'prod';

type Operation = (vals: number[]) => number;

const EMPTY_NODE: FormulaNode = { kind: 'text', value: '' };

const opTable: { [name: string]: Operation } = {
  add: (vals: number[]) => vals[0] + vals[1],
  sub: (vals: number[]) => vals[0] - vals[1],
  div: (vals: number[]) => vals[0] / vals[1],
  mul: (vals: number[]) => vals[0] * vals[1],
  mod: (vals: number[]) => vals[0] % vals[1],
  sum: (vals: number[]) => vals.reduce((prev, curr) => prev + curr, 0),
  prod: (vals: number[]) => vals.reduce((prev, curr) => prev * curr, 1)
};

function hasValue(node: FormulaNode) {
  return node.kind !== 'text';
}

function evalNode(cells: Cells, node: FormulaNode): number {
  if (node.kind === 'number') return node.value;
  if (node.kind === 'text') return 0;
  if (node.kind === 'coord') {
    return evalNode(cells, cells[node.row][node.col].value);
  }

  if (node.kind === 'operation') {
    try {
      const result: number[] = [];

      for (const arg of node.args) {
        if (arg.kind === 'range') {
          for (const refNode of getReferences(cells, arg)) {
            result.push(evalNode(cells, refNode));
          }
        } else {
          result.push(evalNode(cells, arg));
        }
      }

      return opTable[node.operator](result);
    } catch (e) {
      return NaN;
    }
  }

  throw new Error(`Cannot evaluate node: ${node}`);
}

function getReferences(cells: Cells, rangeNode: RangeNode): FormulaNode[] {
  const references: FormulaNode[] = [];
  const { startCoord, endCoord } = rangeNode;

  for (let row = startCoord.row; row <= endCoord.row; row++) {
    for (let col = startCoord.col; col <= endCoord.col; col++) {
      const value = cells[row][col].value;
      references.push(value);
    }
  }

  return references;
}

export { EMPTY_NODE, evalNode, hasValue };

export type { FormulaNode, Operator, Cells };
