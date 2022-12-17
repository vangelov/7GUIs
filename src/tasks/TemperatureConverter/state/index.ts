import { signal } from '@preact/signals-react';

function getInitialState() {
  return {
    celsius: signal(''),
    fahrenheit: signal('')
  };
}

export { getInitialState };
export * from './types';
export * as actions from './actions';
