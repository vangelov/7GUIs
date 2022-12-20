import { actions, State, selectors } from 'tasks/CircleDrawer/state';

type Props = {
  state: State;
};

function ButtonControls({ state }: Props) {
  function onUndoClick() {
    actions.onUndo(state);
  }

  function onRedoClick() {
    actions.onRedo(state);
  }

  const canUndo = selectors.canUndo(state);
  const canRedo = selectors.canRedo(state);

  return (
    <div>
      <button disabled={!canUndo} onClick={onUndoClick}>
        Undo
      </button>
      <button disabled={!canRedo} onClick={onRedoClick}>
        Redo
      </button>
    </div>
  );
}

export { ButtonControls };
