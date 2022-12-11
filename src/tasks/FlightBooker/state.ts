import { Signal } from '@preact/signals-core';
import { formatDate, parseDate } from './dates';

type InputState = 'invalid' | 'disabled' | 'default';
type FlightType = 'oneWay' | 'return';

type State = {
  flightType: Signal<FlightType>;

  start: Signal<string>;
  startDate: Signal<Date | null>;

  end: Signal<string>;
  endDate: Signal<Date | null>;
};

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

function getIsBookingEnabled(state: State) {
  if (state.flightType.value === 'oneWay') {
    return false;
  }

  return true;
}

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

export type { State, FlightType };

export {
  setFlightType as updateFlightType,
  getIsBookingEnabled,
  setStartDate as updateStartDate,
  setEndDate as updateEndDate,
  getStartDateState,
  getEndDateState,
  isBookingEnabled,
  getBookMessage
};
