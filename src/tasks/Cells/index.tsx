import { Task } from 'Task';
import { CellsGrid } from './components';
import { getInitialState } from './state';

const state = getInitialState();

function CellsController() {
  return (
    <Task name="Cells">
      <CellsGrid state={state} />
    </Task>
  );
}

export { CellsController as Cells };
