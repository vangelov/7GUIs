import { Task } from 'Task';
import { DateInput, FlightTypeSelect } from './components';
import {
  FlightType,
  State,
  actions,
  selectors,
  getInitialState
} from './state';

const state: State = getInitialState();

function FlightBooker() {
  function onFlightTypeChange(value: FlightType) {
    actions.setFlightType(state, value);
  }

  function onStartDateChange(value: string) {
    actions.setStartDate(state, value);
  }

  function onEndDateChange(value: string) {
    actions.setEndDate(state, value);
  }

  function onBook() {
    window.alert(selectors.getBookMessage(state));
  }

  const startDateState = selectors.getStartDateState(state);
  const endDateState = selectors.getEndDateState(state);

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

      <button disabled={!selectors.isBookingEnabled(state)} onClick={onBook}>
        Book
      </button>
    </Task>
  );
}

export { FlightBooker };
