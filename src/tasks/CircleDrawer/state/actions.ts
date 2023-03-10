import { signal } from '@preact/signals-react';
import { State, Circle, Position } from './types';

const INITIAL_RADIUS = 20;

function expandHistory(
  state: State,
  getNextCircles: (lastCircles: Circle[]) => Circle[]
) {
  const { history, historyIndex } = state;
  const historyUntilIndex = history.value.slice(0, historyIndex.value + 1);
  const lastCircles = historyUntilIndex[historyUntilIndex.length - 1];
  const nextCircles = getNextCircles(lastCircles);

  history.value = [...historyUntilIndex, nextCircles];

  historyIndex.value = history.value.length - 1;
}

function addCircle(state: State, position: Position) {
  const { circles, lastCircleId } = state;

  const id = lastCircleId.value;
  const circle: Circle = { id, position, radius: INITIAL_RADIUS };
  lastCircleId.value += 1;

  circles.value = [...circles.value, signal(circle)];

  expandHistory(state, (lastCircles) => [...lastCircles, circle]);
}

function onCanvasClick(state: State, position: Position) {
  const { selectedCirleIndex } = state;

  saveRadius(state);

  if (selectedCirleIndex.value === null) {
    addCircle(state, position);
  }

  clearSelection(state);
}

function onCircleRightClick(state: State, index: number) {
  const { adjustDialogPosition, circles, selectedCirleIndex } = state;

  saveRadius(state);
  clearSelection(state);

  selectedCirleIndex.value = index;
  const circle = circles.value[index];
  const { position, radius } = circle.value;

  adjustDialogPosition.value = {
    x: position.x,
    y: position.y + radius
  };
}

function onCircleClick(state: State, index: number) {
  saveRadius(state);
  clearSelection(state);
}

function onDialogStartMove(state: State, initialPointerPosition: Position) {
  state.initialPointerPosition.value = initialPointerPosition;
  state.initialObjectPosition.value = state.adjustDialogPosition.value;
}

function onDialogMove(state: State, position: Position) {
  const {
    adjustDialogPosition,
    initialPointerPosition,
    initialObjectPosition
  } = state;

  if (
    initialPointerPosition.value !== null &&
    initialObjectPosition.value !== null
  ) {
    const dx = position.x - initialPointerPosition.value.x;
    const dy = position.y - initialPointerPosition.value.y;

    adjustDialogPosition.value = {
      x: initialObjectPosition.value.x + dx,
      y: initialObjectPosition.value.y + dy
    };
  }
}

function onRadiusChange(state: State, value: number) {
  const { circles, selectedCirleIndex, radiusChanged } = state;

  if (selectedCirleIndex.value !== null) {
    const circle = circles.value[selectedCirleIndex.value];
    circle.value = { ...circle.value, radius: value };
    radiusChanged.value = true;
  }
}

function onCloseAdjustmentDialog(state: State) {
  saveRadius(state);
  clearSelection(state);
}

function clearSelection(state: State) {
  state.selectedCirleIndex.value = null;
  state.adjustDialogPosition.value = null;
  state.radiusChanged.value = false;
}

function saveRadius(state: State) {
  const { circles, selectedCirleIndex, adjustDialogPosition, radiusChanged } =
    state;

  if (
    selectedCirleIndex.value !== null &&
    adjustDialogPosition.value &&
    radiusChanged.value
  ) {
    const selectedCircle = circles.value[selectedCirleIndex.value];

    expandHistory(state, (lastCircles) =>
      lastCircles.map((circle) =>
        circle.id === selectedCircle.value.id ? selectedCircle.value : circle
      )
    );
  }
}

function onUndo(state: State) {
  const { historyIndex, history, circles } = state;

  clearSelection(state);
  historyIndex.value -= 1;
  circles.value = history.value[historyIndex.value].map(signal);
}

function onRedo(state: State) {
  const { historyIndex, history, circles } = state;

  clearSelection(state);
  historyIndex.value += 1;
  circles.value = history.value[historyIndex.value].map(signal);
}

export {
  onCanvasClick,
  onCircleRightClick,
  onCircleClick,
  onDialogStartMove,
  onDialogMove,
  onRadiusChange,
  onCloseAdjustmentDialog,
  onUndo,
  onRedo
};
