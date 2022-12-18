import { Signal } from '@preact/signals-react';
import { DOMAttributes, MouseEvent } from 'react';
import { actions, Circle, State } from 'tasks/CircleDrawer/state';

type Props = {
  state: State;
  circle: Signal<Circle>;
  index: number;
  isHovered?: boolean;
} & DOMAttributes<SVGCircleElement>;

function CircleItem({
  state,
  circle,
  index,
  isHovered = false,
  ...rest
}: Props) {
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
      className="test"
      cx={position.x}
      cy={position.y}
      r={radius}
      onMouseEnter={() => {
        actions.onCircleMouseEnter(state, index);
      }}
      onMouseLeave={() => {
        actions.onCircleMouseLeave(state, index);
      }}
      stroke="var(--border)"
      fill={
        state.selectedCirleIndex.value === index
          ? 'var(--background)'
          : 'transparent'
      }
      onClick={onClick}
    />
  );
}

export { CircleItem };
