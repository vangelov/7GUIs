import { actions, State, selectors } from 'tasks/CircleDrawer/state';

type ControllerProps = {
  state: State;
};

function ControlsController({ state }: ControllerProps) {
  return (
    <ControlsView
      canUndo={selectors.canUndo(state)}
      canRedo={selectors.canRedo(state)}
      onUndo={() => actions.onUndo(state)}
      onRedo={() => actions.onRedo(state)}
    />
  );
}

// ---

type ViewProps = {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
};

function ControlsView({ canUndo, canRedo, onUndo, onRedo }: ViewProps) {
  return (
    <div>
      <button disabled={!canUndo} onClick={onUndo}>
        Undo
      </button>
      <button disabled={!canRedo} onClick={onRedo}>
        Redo
      </button>
    </div>
  );
}

export { ControlsController as Controls };
