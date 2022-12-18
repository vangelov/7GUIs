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
  historyIndex: Signal<number | null>;
  selectedCirleIndex: Signal<number | null>;
  adjustButtonPosition: Signal<Position | null>;

  dragging: {
    beforeDragPosition: Signal<Position | null>;
    startDragPosition: Signal<Position | null>;
  };

  adjustDialogPosition: Signal<Position | null>;
};

export type { State, Circle, Position };