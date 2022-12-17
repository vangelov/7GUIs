import { useEffect } from 'react';
import { Task } from 'Task';
import { actions, State, getInitialState } from './state';
import { Progress, DurationInput } from './components';

const state: State = getInitialState();

function Timer() {
  useEffect(() => {
    actions.resetTimer(state);
  }, []);

  function onDurationChange(value: number) {
    actions.setDurationInSeconds(state, value);
  }

  function onReset() {
    actions.resetTimer(state);
  }

  return (
    <Task name="Timer">
      <Progress state={state} />

      <DurationInput
        value={state.durationInSeconds.value}
        onChange={onDurationChange}
      />

      <button onClick={onReset}>Reset</button>
    </Task>
  );
}

export { Timer };
