import { signal } from '@preact/signals-react';
import { State } from './types';
import { EMPTY_USER } from './actions';

function getInitialState(): State {
  return {
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
}

export { getInitialState };
export * as actions from './actions';
export * as selectors from './selectors';
export * from './types';
