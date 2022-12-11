import { Signal } from '@preact/signals-core';

type State = {
  counter: Signal<number>;
};

function incrementCounter(state: State) {
  state.counter.value += 1;
}

export type { State };

export { incrementCounter };
