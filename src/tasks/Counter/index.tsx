import { signal } from '@preact/signals-react';
import { Task } from 'Task';
import { State, incrementCounter } from './state';

const state: State = {
  counter: signal(0)
};

function Counter() {
  function onClick() {
    incrementCounter(state);
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
