import { State } from './types';

function incrementCounter(state: State) {
  state.counter.value += 1;
}

export { incrementCounter };
