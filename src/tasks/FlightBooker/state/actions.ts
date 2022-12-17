import { FlightType, State } from './types';
import { parseDate } from 'tasks/FlightBooker/dates';

function setFlightType(state: State, value: FlightType) {
  state.flightType.value = value;
}

function setStartDate(state: State, value: string) {
  state.start.value = value;
  state.startDate.value = parseDate(value);
}

function setEndDate(state: State, value: string) {
  state.end.value = value;
  state.endDate.value = parseDate(value);
}

export { setFlightType, setStartDate, setEndDate };
