import { Task } from 'Task';
import { getInitialState, actions } from './state';

const state = getInitialState();

function Counter() {
  function onClick() {
    actions.incrementCounter(state);
  }

  return (
    <Task name="Counter">
      <div>
        <input readOnly={true} value={state.counter.value}></input>
        <button onClick={onClick}>Count</button>
      </div>
    </Task>
  );
}

export { Counter };
