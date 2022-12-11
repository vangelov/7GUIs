import { Signal } from '@preact/signals-core';

type State = {
  elapsedInSeconds: Signal<number>;
  durationInSeconds: Signal<number>;
  startInSeconds: Signal<number>;
  intervalId: Signal<number | null>;
};

const MAX_DURATION_IN_SECONDS = 30;

function resetTimer(state: State) {
  state.startInSeconds.value = performance.now() / 1000;
  startInterval(state);
}

function setDurationInSeconds(state: State, value: number) {
  state.durationInSeconds.value = value;

  if (
    state.intervalId.value === null &&
    state.durationInSeconds.value > state.elapsedInSeconds.value
  ) {
    startInterval(state);
  }
}

function startInterval(state: State) {
  if (state.intervalId.value !== null) {
    window.clearInterval(state.intervalId.value);
    state.intervalId.value = null;
  }

  state.intervalId.value = window.setInterval(() => {
    const endInSeconds = performance.now() / 1000;
    state.elapsedInSeconds.value = endInSeconds - state.startInSeconds.value;

    if (
      state.elapsedInSeconds.value >= state.durationInSeconds.value &&
      state.intervalId.value !== null
    ) {
      window.clearInterval(state.intervalId.value);
      state.intervalId.value = null;
    }
  }, 100);
}

export type { State };

export { resetTimer, setDurationInSeconds, MAX_DURATION_IN_SECONDS };
