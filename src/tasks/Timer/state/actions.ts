import { State } from './types';

function onResetTimer(state: State) {
  state.initialElapsedSeconds.value = 0;
  startInterval(state);
}

function onDurationChange(state: State, value: number) {
  state.durationInSeconds.value = value;

  if (
    state.intervalId.value === null &&
    state.durationInSeconds.value > state.elapsedInSeconds.value
  ) {
    state.initialElapsedSeconds.value = state.elapsedInSeconds.value;
    startInterval(state);
  }
}

function startInterval(state: State) {
  if (state.intervalId.value !== null) {
    window.clearInterval(state.intervalId.value);
    state.intervalId.value = null;
  }

  state.startInSeconds.value = performance.now() / 1000;

  state.intervalId.value = window.setInterval(() => {
    const nowInSeconds = performance.now() / 1000;
    const dt = nowInSeconds - state.startInSeconds.value;
    state.elapsedInSeconds.value = state.initialElapsedSeconds.value + dt;

    if (
      state.elapsedInSeconds.value >= state.durationInSeconds.value &&
      state.intervalId.value !== null
    ) {
      window.clearInterval(state.intervalId.value);
      state.intervalId.value = null;
    }
  }, 100);
}

export { onResetTimer, onDurationChange };
