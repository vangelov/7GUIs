import { FlightType, State } from './types';
import { parseDate } from 'tasks/FlightBooker/dates';

function onFlightChangeChange(state: State, value: FlightType) {
  state.flightType.value = value;
}

function onStartDateChange(state: State, value: string) {
  state.start.value = value;
  state.startDate.value = parseDate(value);
}

function onEndDateChange(state: State, value: string) {
  state.end.value = value;
  state.endDate.value = parseDate(value);
}

export { onFlightChangeChange, onStartDateChange, onEndDateChange };
