import { signal } from '@preact/signals-core';

import { Task } from 'Task';
import { Controls } from './Controls';
import { FilterInput } from './FilterInput';
import { State, EMPTY_USER } from './state';
import { UserProfile } from './UserProfile';
import { UsersList } from './UsersList';

const state: State = {
  filterPrefix: signal(''),
  users: signal([
    signal({ id: 0, name: 'Hans', surname: 'Emil' }),
    signal({ id: 1, name: 'Max', surname: 'Mustermann' }),
    signal({ id: 2, name: 'Roman', surname: 'Tisch' })
  ]),
  selectedIndex: signal(null),
  currentUser: signal(EMPTY_USER),
  lastId: signal(2)
};

function CRUD() {
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

export { CRUD };
