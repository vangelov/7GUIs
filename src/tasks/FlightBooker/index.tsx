import { signal } from '@preact/signals-core';
import { Task } from 'Task';
import { DateInput } from './DateInput';
import { formatDate } from './dates';
import { FlightTypeSelect } from './FlightTypeSelect';
import {
  FlightType,
  getStartDateState,
  isBookingEnabled,
  State,
  updateFlightType,
  updateStartDate,
  updateEndDate,
  getEndDateState,
  getBookMessage
} from './state';

const initialDate = new Date();

const state: State = {
  flightType: signal('oneWay'),

  start: signal(formatDate(initialDate)),
  startDate: signal(initialDate),

  end: signal(formatDate(initialDate)),
  endDate: signal(initialDate)
};

function FlightBooker() {
  function onFlightTypeChange(value: FlightType) {
    updateFlightType(state, value);
  }

  function onStartDateChange(value: string) {
    updateStartDate(state, value);
  }

  function onEndDateChange(value: string) {
    updateEndDate(state, value);
  }

  function onBook() {
    window.alert(getBookMessage(state));
  }

  const startDateState = getStartDateState(state);
  const endDateState = getEndDateState(state);

  return (
    <Task name="Flight Booker">
      <FlightTypeSelect
        value={state.flightType.value}
        onChange={onFlightTypeChange}
      />

      <DateInput
        isInvalid={startDateState === 'invalid'}
        isDisabled={startDateState === 'disabled'}
        value={state.start.value}
        onChange={onStartDateChange}
      />

      <DateInput
        isInvalid={endDateState === 'invalid'}
        isDisabled={endDateState === 'disabled'}
        value={state.end.value}
        onChange={onEndDateChange}
      />

      <button disabled={!isBookingEnabled(state)} onClick={onBook}>
        Book
      </button>
    </Task>
  );
}

export { FlightBooker };
