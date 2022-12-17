import { signal } from '@preact/signals-react';
import { State } from './types';

const MAX_DURATION_IN_SECONDS = 30;

function getInitialState(): State {
  return {
    elapsedInSeconds: signal(0),
    durationInSeconds: signal(MAX_DURATION_IN_SECONDS / 2),
    intervalId: signal(null),
    startInSeconds: signal(0)
  };
}

export { getInitialState, MAX_DURATION_IN_SECONDS };
export * as actions from './actions';
export * from './types';
