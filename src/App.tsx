import { CircleDrawer } from 'tasks/CircleDrawer';
import { CRUD } from 'tasks/CRUD';
import { FlightBooker } from 'tasks/FlightBooker';
import { Timer } from 'tasks/Timer';
import { Counter } from './tasks/Counter';
import { TemperatureConverter } from './tasks/TemperatureConverter';
import { parse } from './tasks/Cells/parsing';
import { Cells, evalNode } from 'tasks/Cells/formula';
import { signal } from '@preact/signals-react';

const cells: Cells = [
  [signal({ kind: 'number', value: 2 }), signal({ kind: 'number', value: 20 })],
  [signal({ kind: 'number', value: 3 }), signal({ kind: 'number', value: 70 })]
];

const node = parse('=mul(mul(1, mul(5,6)), mul(5, 4))');
console.log('e', node, evalNode(cells, node));

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
    </div>
  );
}

export default App;
