import { Signal } from '@preact/signals-core';

type State = {
  celsius: Signal<string>;
  fahrenheit: Signal<string>;
};

export type { State };
