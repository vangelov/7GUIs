import { actions, State, selectors } from 'tasks/CircleDrawer/state';

type Props = {
  state: State;
};

function ButtonControls({ state }: Props) {
  return (
    <ButtonControlsView
      canUndo={selectors.canUndo(state)}
      canRedo={selectors.canRedo(state)}
      onUndo={() => actions.onUndo(state)}
      onRedo={() => actions.onRedo(state)}
    />
  );
}

type ViewProps = {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
};

function ButtonControlsView({ canUndo, canRedo, onUndo, onRedo }: ViewProps) {
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

export { ButtonControls };
