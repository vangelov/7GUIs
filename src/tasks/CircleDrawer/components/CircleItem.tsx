import { Signal } from '@preact/signals-react';
import { MouseEvent } from 'react';
import { actions, Circle, Position, State } from 'tasks/CircleDrawer/state';
import './CircleItem.css';

type Props = {
  state: State;
  circle: Signal<Circle>;
  index: number;
};

function CircleItem({ state, circle, index }: Props) {
  return (
    <CircleItemView
      position={circle.value.position}
      onSelect={(mousePosition) =>
        actions.onCircleSelect(state, index, mousePosition)
      }
      radius={circle.value.radius}
      isSelected={state.selectedCirleIndex.value === index}
    />
  );
}

type ViewProps = {
  position: Position;
  radius: number;
  onSelect: (mousePosition: Position) => void;
  isSelected: boolean;
};

function CircleItemView({ position, radius, onSelect, isSelected }: ViewProps) {
  function onClick(event: MouseEvent) {
    event.preventDefault();

    const boundingRect = (
      event.currentTarget.parentNode as any
    ).getBoundingClientRect();

    const position = {
      x: event.clientX - boundingRect.x,
      y: event.clientY - boundingRect.y
    };

    onSelect(position);
  }

  return (
    <circle
      className="CircleItem"
      onContextMenu={onClick}
      cx={position.x}
      cy={position.y}
      r={radius}
      style={{
        fill: isSelected ? 'var(--background)' : undefined
      }}
      onClick={onClick}
    />
  );
}

export { CircleItem };
