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

function onStartDrag(
  state: State,
  initialObjectPosition: Position,
  initialPointerPosition: Position
) {
  state.initialPointerPosition.value = initialPointerPosition;
  state.initialObjectPosition.value = initialObjectPosition;
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
  const { circles, selectedCirleIndex } = state;

  if (selectedCirleIndex.value !== null) {
    const circle = circles.value[selectedCirleIndex.value];
    circle.value = { ...circle.value, radius: value };
  }
}

function onCloseAdjustmentDialog(state: State) {
  state.adjustDialogPosition.value = null;
  state.selectedCirleIndex.value = null;
}

export {
  onCanvasSelect,
  onCircleSelect,
  onStartDrag,
  onDrag,
  onAdjustDiameter,
  onSetDiameter,
  onCloseAdjustmentDialog
};
