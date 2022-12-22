import { DOMAttributes } from 'react';
import { Position, State, actions } from 'tasks/CircleDrawer/state';
import './AdjustmentButton.css';

type Props = {
  state: State;
};

function AdjustmentButton({ state }: Props) {
  const { adjustButtonPosition } = state;

  return (
    adjustButtonPosition.value && (
      <AdjustmentButtonView
        position={adjustButtonPosition.value}
        onClick={() => actions.onAdjustRadius(state)}
      />
    )
  );
}

type ViewProps = {
  position: Position;
} & DOMAttributes<HTMLButtonElement>;

function AdjustmentButtonView({ position, onClick }: ViewProps) {
  return (
    <button
      onClick={onClick}
      className="AdjustmentButton"
      style={{
        top: position.y,
        left: position.x
      }}
    >
      Adjust diameter...
    </button>
  );
}

export { AdjustmentButton };
