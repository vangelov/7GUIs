import { signal } from '@preact/signals-react';
import { State } from './types';

function getInitialState(): State {
  return {
    cells: [
      [signal({}), signal({}), signal({}), signal({}), signal({}), signal({})],
      [signal({}), signal({}), signal({}), signal({}), signal({}), signal({})],
      [signal({}), signal({}), signal({}), signal({}), signal({}), signal({})],
      [signal({}), signal({}), signal({}), signal({}), signal({}), signal({})],
      [signal({}), signal({}), signal({}), signal({}), signal({}), signal({})],
      [signal({}), signal({}), signal({}), signal({}), signal({}), signal({})],
      [signal({}), signal({}), signal({}), signal({}), signal({}), signal({})],
      [signal({}), signal({}), signal({}), signal({}), signal({}), signal({})],
      [signal({}), signal({}), signal({}), signal({}), signal({}), signal({})],
      [signal({}), signal({}), signal({}), signal({}), signal({}), signal({})]
    ]
  };
}
export { getInitialState };
export * as actions from './actions';
export * from './types';
