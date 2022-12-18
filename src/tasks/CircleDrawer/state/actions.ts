import { signal } from '@preact/signals-react';
import { State, Circle, Position } from './types';

const INITIAL_RADIUS = 20;

function addCircle(state: State, position: Position) {
  const { history, circles, lastCircleId } = state;

  const id = lastCircleId.value;
  const circle: Circle = { id, position, radius: INITIAL_RADIUS };

  history.value = [...history.value, [...circles.value, signal(circle)]];
  circles.value = [...circles.value, signal(circle)];
  lastCircleId.value += 1;
}

function onCanvasSelect(state: State, position: Position) {
  const { selectedCirleIndex, adjustButtonPosition, adjustDialogPosition } =
    state;

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

  if (adjustButtonPosition.value || adjustDialogPosition.value) {
    adjustButtonPosition.value = null;
    adjustDialogPosition.value = null;
    selectedCirleIndex.value = index;
  } else {
    adjustButtonPosition.value = position;
  }
}

function onCircleMouseEnter(state: State, index: number) {
  const { adjustButtonPosition, selectedCirleIndex, adjustDialogPosition } =
    state;

  if (!adjustButtonPosition.value && !adjustDialogPosition.value) {
    selectedCirleIndex.value = index;
  }
}

function onCircleMouseLeave(state: State, index: number) {
  const { adjustButtonPosition, selectedCirleIndex, adjustDialogPosition } =
    state;

  if (!adjustButtonPosition.value && !adjustDialogPosition.value) {
    selectedCirleIndex.value = null;
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

function onStartDrag(
  state: State,
  beforeDragPosition: Position,
  startDragPosition: Position
) {
  const { dragging } = state;

  dragging.beforeDragPosition.value = beforeDragPosition;
  dragging.startDragPosition.value = startDragPosition;
}

function onDrag(state: State, position: Position) {
  const { beforeDragPosition: lastObjectPosition, startDragPosition } =
    state.dragging;

  if (startDragPosition.value === null) {
    return;
  }

  const dx = position.x - startDragPosition.value.x;
  const dy = position.y - startDragPosition.value.y;

  const { adjustDialogPosition } = state;

  if (
    adjustDialogPosition.value !== null &&
    lastObjectPosition.value !== null
  ) {
    adjustDialogPosition.value = {
      x: lastObjectPosition.value.x + dx,
      y: lastObjectPosition.value.y + dy
    };
  }
}

function onSetDiameter(state: State, value: number) {
  const { circles, selectedCirleIndex } = state;

  if (selectedCirleIndex.value !== null) {
    const circle = circles.value[selectedCirleIndex.value];
    circle.value = { ...circle.value, radius: value };
  }
}

export {
  onCanvasSelect,
  onCircleSelect,
  onCircleMouseEnter,
  onCircleMouseLeave,
  onStartDrag,
  onDrag,
  onAdjustDiameter,
  onSetDiameter
};
