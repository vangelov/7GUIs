import { Task } from 'Task';
import { Input } from './Input';
import { getInitialState, actions, State } from './state';

const state: State = getInitialState();

function TemperatureConverter() {
  function onCelsiusInputChange(value: string) {
    actions.setCelsius(state, value);
  }

  function onFahrenheitInputChange(value: string) {
    actions.setFahrenheit(state, value);
  }

  return (
    <Task name="Temperature Converter">
      <Input
        label="Celsius"
        value={state.celsius.value}
        onChange={onCelsiusInputChange}
      />

      <Input
        label="Fahrenheit"
        value={state.fahrenheit.value}
        onChange={onFahrenheitInputChange}
      />
    </Task>
  );
}

export { TemperatureConverter };
