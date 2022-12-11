import { Signal } from '@preact/signals-core';
import { celsiusToFahrenheit } from './units';

type State = {
  celsius: Signal<string>;
  fahrenheit: Signal<string>;
};

function isNumeric(n: number) {
  return !isNaN(n) && isFinite(n);
}

function formatValue(value: number) {
  return Math.round(value).toString();
}

function setCelsius(state: State, value: string) {
  state.celsius.value = value;

  const parsedValue = parseFloat(value);

  if (isNumeric(parsedValue)) {
    const fahrenheit = celsiusToFahrenheit(parsedValue);
    state.fahrenheit.value = formatValue(fahrenheit);
  }
}

function setFahrenheit(state: State, value: string) {
  state.fahrenheit.value = value;

  const parsedValue = parseFloat(value);

  if (isNumeric(parsedValue)) {
    const celsius = celsiusToFahrenheit(parsedValue);
    state.celsius.value = formatValue(celsius);
  }
}

export type { State };

export { setCelsius, setFahrenheit };
