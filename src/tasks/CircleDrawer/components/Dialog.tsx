import { ChangeEvent, HTMLAttributes, MouseEvent } from 'react';
import {
  State,
  actions,
  Position,
  selectors,
  Circle
} from 'tasks/CircleDrawer/state';

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

  return (
    <DialogView
      circle={circle.value}
      onRadiusChange={onRadiusChange}
      position={state.adjustDialogPosition.value}
      onDragStart2={(position) => {
        if (state.adjustDialogPosition.value) {
          actions.onStartDrag(
            state,
            state.adjustDialogPosition.value,
            position
          );
        }
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
} & HTMLAttributes<HTMLDivElement>;

function DialogView({
  position,
  onDragStart2,
  onDrag2,
  circle,
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
      style={{
        position: 'absolute',
        backgroundColor: 'var(--background-body)',
        boxShadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        width: 300,
        overflow: 'hidden',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'var(--border)',
        borderStyle: 'solid',
        top: position.y,
        left: position.x
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--background-alt)',
          width: '100%',
          padding: 8,
          fontSize: '1.2rem',
          fontWeight: 'semibold',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'move'
        }}
        onMouseDown={onMouseDown}
      >
        <div>Adjust diameter</div>
        <div
          style={{ fontSize: '1rem', cursor: 'pointer', userSelect: 'none' }}
        >
          ✕
        </div>
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
