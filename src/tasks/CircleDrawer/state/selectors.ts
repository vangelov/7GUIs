import { Signal } from '@preact/signals-core';
import { State, Circle } from './types';

function getSelectedCircle(state: State): Signal<Circle> | null {
  const { selectedCirleIndex, circles } = state;

  if (selectedCirleIndex.value !== null) {
    return circles.value[selectedCirleIndex.value];
  }

  return null;
}

function canUndo(state: State) {
  const { historyIndex, adjustDialogPosition } = state;
  return !adjustDialogPosition.value && historyIndex.value > 0;
}

function canRedo(state: State) {
  const { historyIndex, history, adjustDialogPosition } = state;

  return (
    !adjustDialogPosition.value && historyIndex.value < history.value.length - 1
  );
}

export { getSelectedCircle, canUndo, canRedo };
