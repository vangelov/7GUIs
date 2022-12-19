import { Signal } from '@preact/signals-core';
import { State, Circle } from './types';

function getSelectedCircle(state: State): Signal<Circle> | null {
  const { selectedCirleIndex, circles } = state;

  if (selectedCirleIndex.value !== null) {
    const circle = circles.value[selectedCirleIndex.value];
    return circle;
  }

  return null;
}

export { getSelectedCircle };
