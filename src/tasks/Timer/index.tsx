import { signal } from '@preact/signals-core';
import { useEffect } from 'react';
import { Task } from 'Task';
import { DurationInput } from './DurationInput';
import {
  resetTimer,
  setDurationInSeconds,
  State,
  MAX_DURATION_IN_SECONDS
} from './state';
import { Progress } from './Progress';

const state: State = {
  elapsedInSeconds: signal(0),
  durationInSeconds: signal(MAX_DURATION_IN_SECONDS / 2),
  intervalId: signal(null),
  startInSeconds: signal(0)
};

function Timer() {
  useEffect(() => {
    resetTimer(state);
  }, []);

  function onDurationChange(value: number) {
    setDurationInSeconds(state, value);
  }

  function onReset() {
    resetTimer(state);
  }

  return (
    <Task name="Timer">
      <Progress
        elapsedInSeconds={state.elapsedInSeconds}
        durationInSeconds={state.durationInSeconds}
      />

      <DurationInput
        value={state.durationInSeconds.value}
        onChange={onDurationChange}
      />

      <button onClick={onReset}>Reset</button>
    </Task>
  );
}

export { Timer };
