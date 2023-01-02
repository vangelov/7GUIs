import { Task } from 'Task';
import { Canvas } from './components';
import { AdjustmentButton } from './components/AdjustmentButton';
import { ButtonControls } from './components/ButtonControls';
import { Dialog } from './components/Dialog';
import { getInitialState } from './state';

const state = getInitialState();

function CircleDrawer() {
  return (
    <Task name="Circle Drawer" style={{ marginBottom: 14 }}>
      <ButtonControls state={state} />

      <div style={{ position: 'relative' }}>
        <Canvas state={state} />
        <AdjustmentButton state={state} />
        <Dialog state={state} />
      </div>
    </Task>
  );
}

export { CircleDrawer };
