import { Task } from 'Task';
import { CellsGrid } from './components';
import { getInitialState } from './state';

const state = getInitialState();

function Cells() {
  return (
    <Task name="Cells">
      <CellsGrid state={state} />
    </Task>
  );
}

export { Cells };
