import { signal } from '@preact/signals-core';

import { Task } from 'Task';
import { Input } from './Input';
import { setCelsius, setFahrenheit, State } from './state';

const state: State = {
  celsius: signal(''),
  fahrenheit: signal('')
};

function TemperatureConverter() {
  function onCelsiusInputChange(value: string) {
    setCelsius(state, value);
  }

  function onFahrenheitInputChange(value: string) {
    setFahrenheit(state, value);
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
