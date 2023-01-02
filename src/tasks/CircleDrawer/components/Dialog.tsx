import { ChangeEvent, HTMLAttributes, MouseEvent } from 'react';
import {
  State,
  actions,
  Position,
  selectors,
  Circle
} from 'tasks/CircleDrawer/state';
import './Dialog.css';

type Props = {
  state: State;
};

function Dialog({ state }: Props) {
  const circle = selectors.getSelectedCircle(state);

  if (!state.adjustDialogPosition.value || !circle) {
    return null;
  }

  return (
    <DialogView
      circle={circle.value}
      onClose={() => actions.onCloseAdjustmentDialog(state)}
      onRadiusChange={(radius) => actions.onRadiusChange(state, radius)}
      position={state.adjustDialogPosition.value}
      onMoveStart={(position) => {
        actions.onDialogStartMove(state, position);
      }}
      onMove={(position) => actions.onDialogMove(state, position)}
    />
  );
}

type ViewProps = {
  position: Position;
  onMoveStart: (position: Position) => void;
  onMove: (position: Position) => void;
  circle: Circle;
  onRadiusChange: (value: number) => void;
  onClose: () => void;
} & HTMLAttributes<HTMLDivElement>;

function DialogView({
  position,
  onMoveStart,
  onMove,
  circle,
  onClose,
  onRadiusChange
}: ViewProps) {
  function onMouseDown(event: MouseEvent) {
    onMoveStart({
      x: event.clientX,
      y: event.clientY
    });

    function onMouseMove(event: any) {
      onMove({ x: event.clientX, y: event.clientY });
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    onRadiusChange(Number(value));
  }

  return (
    <div
      className="Dialog"
      style={{
        top: position.y,
        left: position.x
      }}
    >
      <div className="Dialog-Header" onMouseDown={onMouseDown}>
        <div>Adjust diameter</div>
        <button onClick={onClose} className="Dialog-CloseButton">
          ✕
        </button>
      </div>
      <div style={{ padding: 10 }}>
        <input
          style={{
            width: '100%',
            margin: 0
          }}
          type="range"
          min={1}
          max={100}
          step={0.1}
          value={circle.radius}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export { Dialog };
