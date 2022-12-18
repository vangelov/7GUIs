import { State } from './types';

function getSelectedCircle(state: State) {
  const { selectedCirleIndex, circles } = state;

  if (selectedCirleIndex.value !== null) {
    const circle = circles.value[selectedCirleIndex.value];
    return circle;
  }

  return null;
}

export { getSelectedCircle };
