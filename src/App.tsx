import { CircleDrawer } from 'tasks/CircleDrawer';
import { CRUD } from 'tasks/CRUD';
import { FlightBooker } from 'tasks/FlightBooker';
import { Timer } from 'tasks/Timer';
import { Counter } from './tasks/Counter';
import { TemperatureConverter } from './tasks/TemperatureConverter';
import { parse } from './tasks/Cells/parsing';
import { evalNode, FormulaNode } from 'tasks/Cells/formula';
import { Signal, signal } from '@preact/signals-react';
import { Cells } from 'tasks/Cells';

const cells: Signal<FormulaNode>[][] = [
  [signal({ kind: 'number', value: 2 }), signal({ kind: 'number', value: 20 })],
  [signal(parse('=mul(B0,B1)')), signal({ kind: 'number', value: 70 })]
];
const node = parse('=sum(A0, A1)');

function get(row: number, col: number): FormulaNode {
  return cells[row][col].value;
}
console.log('e', node, evalNode(node, get));

function App() {
  return (
    <div>
      <h1>7GUIs</h1>
      <hr />
      <Counter />
      <hr />
      <TemperatureConverter />
      <hr />
      <FlightBooker />
      <hr />
      <Timer />
      <hr />
      <CRUD />
      <hr />
      <CircleDrawer />
      <hr />
      <Cells />
    </div>
  );
}

export default App;
