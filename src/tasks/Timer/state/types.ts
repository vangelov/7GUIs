import { Signal } from '@preact/signals-core';

type State = {
  elapsedInSeconds: Signal<number>;
  durationInSeconds: Signal<number>;
  startInSeconds: Signal<number>;
  intervalId: Signal<number | null>;
};

export type { State };
