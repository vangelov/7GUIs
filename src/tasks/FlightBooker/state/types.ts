import { Signal } from '@preact/signals-core';

type InputState = 'invalid' | 'disabled' | 'default';

type FlightType = 'oneWay' | 'return';

type State = {
  flightType: Signal<FlightType>;

  start: Signal<string>;
  startDate: Signal<Date | null>;

  end: Signal<string>;
  endDate: Signal<Date | null>;
};

export type { State, FlightType, InputState };
