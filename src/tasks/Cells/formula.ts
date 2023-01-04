// Adapted from: https://github.com/eugenkiss/7guis-React-TypeScript-MobX/blob/master/src/app/guis/cells/formula.ts

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

type FormulaNodeGetter = (row: number, col: number) => FormulaNode;

type FormulaNode =
  | NumberNode
  | TextNode
  | CoordNode
  | RangeNode
  | OperationNode;

type Operator = 'add' | 'sub' | 'div' | 'mul' | 'mod' | 'mod' | 'sum' | 'prod';

type Operation = (vals: number[]) => number;

const EMPTY_NODE: FormulaNode = { kind: 'text', value: '' };

const operationsTable: { [name: string]: Operation } = {
  add: (values: number[]) => values[0] + values[1],
  sub: (values: number[]) => values[0] - values[1],
  div: (values: number[]) => values[0] / values[1],
  mul: (values: number[]) => values[0] * values[1],
  mod: (values: number[]) => values[0] % values[1],
  sum: (values: number[]) => values.reduce((prev, curr) => prev + curr, 0),
  prod: (values: number[]) => values.reduce((prev, curr) => prev * curr, 1)
};

function hasValue(node: FormulaNode) {
  return node.kind !== 'text';
}

function evalNode(node: FormulaNode, get: FormulaNodeGetter): number {
  if (node.kind === 'number') return node.value;
  if (node.kind === 'text') return 0;
  if (node.kind === 'coord') {
    return evalNode(get(node.row, node.col), get);
  }

  if (node.kind === 'operation') {
    try {
      const result: number[] = [];

      for (const arg of node.args) {
        if (arg.kind === 'range') {
          for (const refNode of getReferences(arg, get)) {
            result.push(evalNode(refNode, get));
          }
        } else {
          result.push(evalNode(arg, get));
        }
      }

      return operationsTable[node.operator.toLowerCase()](result);
    } catch (e) {
      return NaN;
    }
  }

  throw new Error(`Cannot evaluate node: ${node}`);
}

function getReferences(
  rangeNode: RangeNode,
  get: FormulaNodeGetter
): FormulaNode[] {
  const references: FormulaNode[] = [];
  const { startCoord, endCoord } = rangeNode;

  for (let row = startCoord.row; row <= endCoord.row; row++) {
    for (let col = startCoord.col; col <= endCoord.col; col++) {
      references.push(get(row, col));
    }
  }

  return references;
}

export { EMPTY_NODE, evalNode, hasValue };

export type { FormulaNode, Operator };
