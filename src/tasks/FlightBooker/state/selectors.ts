import { formatDate } from 'tasks/FlightBooker/dates';
import { State, InputState } from './types';

function getStartDateState(state: State): InputState {
  if (state.start.value && !state.startDate.value) {
    return 'invalid';
  }

  return 'default';
}

function getEndDateState(state: State): InputState {
  if (state.flightType.value === 'oneWay') {
    return 'disabled';
  }

  if (state.end.value && !state.endDate.value) {
    return 'invalid';
  }

  return 'default';
}

function isBookingEnabled(state: State) {
  if (state.flightType.value === 'oneWay') {
    return state.startDate.value !== null;
  }

  return (
    state.startDate.value !== null &&
    state.endDate.value !== null &&
    state.startDate.value <= state.endDate.value
  );
}

function getBookMessage(state: State) {
  if (state.flightType.value === 'oneWay') {
    return `You have booked a one-way flight on ${formatDate(
      state.startDate.value
    )}.`;
  }

  return `You have booked a return flight from ${formatDate(
    state.startDate.value
  )} to ${formatDate(state.endDate.value)}.`;
}

export { getStartDateState, getEndDateState, isBookingEnabled, getBookMessage };
