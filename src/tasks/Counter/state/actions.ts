import { State } from './types';

function onIncrementCounter(state: State) {
  state.counter.value += 1;
}

export { onIncrementCounter };
