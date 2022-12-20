import { ChangeEvent, HTMLAttributes, MouseEvent } from 'react';
import {
  State,
  actions,
  Position,
  selectors,
  Circle
} from 'tasks/CircleDrawer/state';
import { onCloseAdjustmentDialog } from '../state/actions';
import './Dialog.css';

type Props = {
  state: State;
};

function Dialog({ state }: Props) {
  const circle = selectors.getSelectedCircle(state);

  if (!state.adjustDialogPosition.value || !circle) {
    return null;
  }

  function onRadiusChange(radius: number) {
    if (circle) {
      circle.value = { ...circle.value, radius };
    }
  }

  function onClose() {
    onCloseAdjustmentDialog(state);
  }

  return (
    <DialogView
      circle={circle.value}
      onClose={onClose}
      onRadiusChange={onRadiusChange}
      position={state.adjustDialogPosition.value}
      onDragStart2={(position) => {
        actions.onStartDrag(state, position);
      }}
      onDrag2={(position) => actions.onDrag(state, position)}
    />
  );
}

type ViewProps = {
  position: Position;
  onDragStart2: (position: Position) => void;
  onDrag2: (position: Position) => void;
  circle: Circle;
  onRadiusChange: (value: number) => void;
  onClose: () => void;
} & HTMLAttributes<HTMLDivElement>;

function DialogView({
  position,
  onDragStart2,
  onDrag2,
  circle,
  onClose,
  onRadiusChange
}: ViewProps) {
  function onMouseDown(event: MouseEvent) {
    onDragStart2({
      x: event.clientX,
      y: event.clientY
    });

    function onMouseMove(event: any) {
      onDrag2({ x: event.clientX, y: event.clientY });
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
