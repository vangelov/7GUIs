import { Task } from 'Task';
import { getInitialState, actions } from './state';

const state = getInitialState();

function CounterController() {
  return (
    <Task name="Counter">
      <CounterView
        value={state.counter.value}
        onCount={() => actions.onIncrementCounter(state)}
      />
    </Task>
  );
}

// ---

type ViewProps = {
  value: number;
  onCount: () => void;
};

function CounterView({ value, onCount }: ViewProps) {
  return (
    <div>
      <input readOnly={true} value={value}></input>
      <button onClick={onCount}>Count</button>
    </div>
  );
}

export { CounterController as Counter };
