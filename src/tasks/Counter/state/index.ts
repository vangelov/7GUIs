import { signal } from '@preact/signals-react';
import { State } from './types';

function getInitialState(): State {
  return {
    counter: signal(0)
  };
}

export { getInitialState };
export * from './types';
export * as actions from './actions';
