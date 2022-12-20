import { Task } from 'Task';
import { Canvas } from './components';
import { ButtonControls } from './components/ButtonControls';
import { Dialog } from './components/Dialog';
import { actions, getInitialState } from './state';

const state = getInitialState();

function CircleDrawer() {
  const { adjustButtonPosition } = state;

  function onAdjustButtonClick() {
    actions.onAdjustDiameter(state);
  }

  return (
    <Task name="Circle Drawer">
      <ButtonControls state={state} />
      <div style={{ position: 'relative' }}>
        <Canvas state={state} />

        {adjustButtonPosition.value && (
          <button
            onClick={onAdjustButtonClick}
            style={{
              position: 'absolute',
              top: adjustButtonPosition.value.y,
              left: adjustButtonPosition.value.x,
              whiteSpace: 'nowrap',
              padding: 6
            }}
          >
            Adjust diameter...
          </button>
        )}

        <Dialog state={state} />
      </div>
    </Task>
  );
}

export { CircleDrawer };
