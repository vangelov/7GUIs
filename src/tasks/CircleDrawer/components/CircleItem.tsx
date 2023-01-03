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
      onSelect={() => actions.onCircleSelect(state, index)}
      radius={circle.value.radius}
      isSelected={state.selectedCirleIndex.value === index}
    />
  );
}

// ---

type ViewProps = {
  position: Position;
  radius: number;
  onSelect: () => void;
  isSelected: boolean;
};

function CircleItemView({ position, radius, onSelect, isSelected }: ViewProps) {
  function onContextMenu(event: MouseEvent) {
    event.preventDefault();
    onSelect();
  }

  return (
    <circle
      className="CircleItem"
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
