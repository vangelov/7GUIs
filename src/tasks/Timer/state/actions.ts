import { State } from './types';

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

export { resetTimer, setDurationInSeconds };
