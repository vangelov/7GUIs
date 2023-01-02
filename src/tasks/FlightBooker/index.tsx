import { Task } from 'Task';
import { DateInput, FlightTypeSelect } from './components';
import { State, actions, selectors, getInitialState } from './state';

const state: State = getInitialState();

function FlightBooker() {
  function onBook() {
    window.alert(selectors.getBookMessage(state));
  }

  const startDateState = selectors.getStartDateState(state);
  const endDateState = selectors.getEndDateState(state);

  return (
    <Task name="Flight Booker">
      <FlightTypeSelect
        value={state.flightType.value}
        onChange={(value) => actions.onFlightChangeChange(state, value)}
      />

      <DateInput
        isInvalid={startDateState === 'invalid'}
        isDisabled={startDateState === 'disabled'}
        value={state.start.value}
        onChange={(value) => actions.onStartDateChange(state, value)}
      />

      <DateInput
        isInvalid={endDateState === 'invalid'}
        isDisabled={endDateState === 'disabled'}
        value={state.end.value}
        onChange={(value) => actions.onEndDateChange(state, value)}
      />

      <button disabled={!selectors.isBookingEnabled(state)} onClick={onBook}>
        Book
      </button>
    </Task>
  );
}

export { FlightBooker };
