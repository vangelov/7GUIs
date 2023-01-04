import { Signal } from '@preact/signals-react';
import { MouseEvent } from 'react';
import { actions, Circle, Position, State } from 'tasks/CircleDrawer/state';
import './CircleItem.css';

type ControllerProps = {
  state: State;
  circle: Signal<Circle>;
  index: number;
};

function CircleItemController({ state, circle, index }: ControllerProps) {
  return (
    <CircleItemView
      position={circle.value.position}
      onClick={() => actions.onCircleClick(state, index)}
      onRightClick={() => actions.onCircleRightClick(state, index)}
      radius={circle.value.radius}
      isSelected={state.selectedCirleIndex.value === index}
    />
  );
}

// ---

type ViewProps = {
  position: Position;
  radius: number;
  isSelected: boolean;
  onRightClick: () => void;
  onClick: () => void;
};

function CircleItemView({
  position,
  radius,
  onClick,
  onRightClick,
  isSelected
}: ViewProps) {
  function onContextMenu(event: MouseEvent) {
    event.preventDefault();
    onRightClick();
  }

  return (
    <circle
      className="CircleItem"
      onClick={onClick}
      onContextMenu={onContextMenu}
      cx={position.x}
      cy={position.y}
      r={radius}
      style={{
        fill: isSelected ? 'var(--background)' : undefined
      }}
    />
  );
}

export { CircleItemController as CircleItem };
