import { Signal } from '@preact/signals-react';
import { MouseEvent } from 'react';
import { actions, Circle, State } from 'tasks/CircleDrawer/state';
import './CircleItem.css';

type Props = {
  state: State;
  circle: Signal<Circle>;
  index: number;
  isHovered?: boolean;
};

function CircleItem({ state, circle, index, isHovered = false }: Props) {
  const { position, radius } = circle.value;

  function onClick(event: MouseEvent) {
    const boundingRect = (
      event.currentTarget.parentNode as any
    ).getBoundingClientRect();

    const position = {
      x: event.clientX - boundingRect.x,
      y: event.clientY - boundingRect.y
    };

    actions.onCircleSelect(state, index, position);
  }

  return (
    <circle
      className="CircleItem"
      cx={position.x}
      cy={position.y}
      r={radius}
      style={{
        fill:
          state.selectedCirleIndex.value === index
            ? 'var(--background)'
            : state.selectedCirleIndex.value === null
            ? undefined
            : 'transparent'
      }}
      onClick={onClick}
    />
  );
}

export { CircleItem };
