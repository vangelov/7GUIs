import { Signal, signal } from '@preact/signals-react';
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

function onCanvasSelect(state: State, position: Position) {
  const { selectedCirleIndex, adjustButtonPosition, adjustDialogPosition } =
    state;

  saveRadius(state);

  if (selectedCirleIndex.value === null) {
    addCircle(state, position);
  }

  adjustButtonPosition.value = null;
  adjustDialogPosition.value = null;
  selectedCirleIndex.value = null;
}

function onCircleSelect(state: State, index: number, position: Position) {
  const { adjustButtonPosition, selectedCirleIndex, adjustDialogPosition } =
    state;

  if (!adjustButtonPosition.value && !adjustDialogPosition.value) {
    selectedCirleIndex.value = index;
    adjustButtonPosition.value = position;
  } else {
    selectedCirleIndex.value = null;
    adjustButtonPosition.value = null;
    adjustDialogPosition.value = null;
  }
}

function onAdjustDiameter(state: State) {
  const {
    selectedCirleIndex,
    circles,
    adjustDialogPosition,
    adjustButtonPosition
  } = state;

  adjustButtonPosition.value = null;

  if (selectedCirleIndex.value !== null) {
    const circle = circles.value[selectedCirleIndex.value];
    const { position, radius } = circle.value;
    adjustDialogPosition.value = {
      x: position.x,
      y: position.y + radius
    };
  }
}

function onStartDrag(state: State, initialPointerPosition: Position) {
  state.initialPointerPosition.value = initialPointerPosition;
  state.initialObjectPosition.value = state.adjustDialogPosition.value;
}

function onDrag(state: State, position: Position) {
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

function onSetDiameter(state: State, value: number) {
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
  const {
    adjustDialogPosition,
    selectedCirleIndex,
    adjustButtonPosition,
    radiusChanged
  } = state;

  selectedCirleIndex.value = null;
  adjustButtonPosition.value = null;
  adjustDialogPosition.value = null;
  radiusChanged.value = false;
}

function saveRadius(state: State) {
  const { circles, selectedCirleIndex, adjustDialogPosition } = state;

  if (selectedCirleIndex.value !== null && adjustDialogPosition.value) {
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
  onCanvasSelect,
  onCircleSelect,
  onStartDrag,
  onDrag,
  onAdjustDiameter,
  onSetDiameter,
  onCloseAdjustmentDialog,
  onUndo,
  onRedo
};
