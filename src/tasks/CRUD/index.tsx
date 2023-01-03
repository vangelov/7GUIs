import { Task } from 'Task';
import { getInitialState } from './state';
import { UsersList, UserProfile, FilterInput, Controls } from './components';

const state = getInitialState();

function CRUDController() {
  return (
    <Task name="CRUD">
      <FilterInput state={state} />

      <div style={{ display: 'flex' }}>
        <UsersList state={state} />
        <UserProfile state={state} />
      </div>

      <Controls state={state} />
    </Task>
  );
}

export { CRUDController as CRUD };
