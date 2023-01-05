import { Task } from 'Task';
import { CellsGrid } from './components';
import { getInitialState } from './state';

const state = getInitialState();

function CellsController() {
  return (
    <Task
      name="Cells"
      prompt="(Double-click on a cell to view or update its formula.)"
    >
      <CellsGrid state={state} />
    </Task>
  );
}

export { CellsController as Cells };
