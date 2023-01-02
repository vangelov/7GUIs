import { Task } from 'Task';
import { Dialog, ButtonControls, Canvas } from './components';
import { getInitialState } from './state';

const state = getInitialState();

function CircleDrawer() {
  return (
    <Task name="Circle Drawer" style={{ marginBottom: 14 }}>
      <ButtonControls state={state} />

      <div style={{ position: 'relative' }}>
        <Canvas state={state} />
        <Dialog state={state} />
      </div>
    </Task>
  );
}

export { CircleDrawer };
