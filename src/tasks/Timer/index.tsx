import { useEffect } from 'react';
import { Task } from 'Task';
import { actions, State, getInitialState } from './state';
import { Progress, DurationInput } from './components';

const state: State = getInitialState();

function Timer() {
  useEffect(() => {
    actions.onResetTimer(state);
  }, []);

  return (
    <Task name="Timer">
      <Progress state={state} />

      <DurationInput
        value={state.durationInSeconds.value}
        onChange={(value) => actions.onDurationChange(state, value)}
      />

      <button onClick={() => actions.onResetTimer(state)}>Reset</button>
    </Task>
  );
}

export { Timer };
