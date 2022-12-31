import { Task } from 'Task';
import { CellsGrid } from './CellsGrid';
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
