import { Signal } from '@preact/signals-core';

type Position = {
  x: number;
  y: number;
};

type Circle = {
  id: number;
  radius: number;
  position: Position;
};

type State = {
  lastCircleId: Signal<number>;
  circles: Signal<Signal<Circle>[]>;
  history: Signal<Signal<Circle>[][]>;
  historyIndex: Signal<number>;
  selectedCirleIndex: Signal<number | null>;
  radiusChanged: Signal<boolean>;

  adjustButtonPosition: Signal<Position | null>;
  adjustDialogPosition: Signal<Position | null>;

  initialPointerPosition: Signal<Position | null>;
  initialObjectPosition: Signal<Position | null>;
};

export type { State, Circle, Position };
