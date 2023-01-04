import { Signal } from '@preact/signals-core';

type State = {
  elapsedInSeconds: Signal<number>;
  durationInSeconds: Signal<number>;
  startInSeconds: Signal<number>;
  intervalId: Signal<number | null>;
  initialElapsedSeconds: Signal<number>;
};

export type { State };
