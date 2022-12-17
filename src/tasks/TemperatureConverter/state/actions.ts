import {
  celsiusToFahrenheit,
  fahrenheitToCelsius
} from 'tasks/TemperatureConverter/units';
import { State } from './types';

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
    const celsius = fahrenheitToCelsius(parsedValue);
    state.celsius.value = formatValue(celsius);
  }
}

export { setCelsius, setFahrenheit };
