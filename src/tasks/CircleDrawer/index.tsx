import { Task } from 'Task';
import { Dialog, Controls, Canvas } from './components';
import { getInitialState } from './state';

const state = getInitialState();

function CircleDrawerController() {
  return (
    <Task name="Circle Drawer" style={{ marginBottom: 14 }}>
      <Controls state={state} />

      <div style={{ position: 'relative' }}>
        <Canvas state={state} />
        <Dialog state={state} />
      </div>
    </Task>
  );
}

export { CircleDrawerController as CircleDrawer };
