import { Task } from 'Task';
import { Input } from './components';
import { getInitialState, actions, State } from './state';

const state: State = getInitialState();

function TemperatureConverter() {
  return (
    <Task name="Temperature Converter" style={{ marginBottom: 14 }}>
      <Input
        label="Celsius"
        value={state.celsius.value}
        onChange={(value) => actions.onCelsiusChange(state, value)}
      />

      <Input
        label="Fahrenheit"
        value={state.fahrenheit.value}
        onChange={(value) => actions.onFahrenheitChange(state, value)}
      />
    </Task>
  );
}

export { TemperatureConverter };
