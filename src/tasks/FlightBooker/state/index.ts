import { signal } from '@preact/signals-react';
import { formatDate } from 'tasks/FlightBooker/dates';
import { State } from './types';

function getInitialState(): State {
  const initialDate = new Date();

  return {
    flightType: signal('oneWay'),

    start: signal(formatDate(initialDate)),
    startDate: signal(initialDate),

    end: signal(formatDate(initialDate)),
    endDate: signal(initialDate)
  };
}

export * from './types';
export * as selectors from './selectors';
export * as actions from './actions';
export { getInitialState };
