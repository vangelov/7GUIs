import { State, actions, selectors } from 'tasks/CRUD/state';

type Props = {
  state: State;
};

function Controls({ state }: Props) {
  return (
    <ControlsView
      canCreate={selectors.canCreateUser(state)}
      canUpdate={selectors.canUpdateUser(state)}
      canDelete={selectors.canDeleteUser(state)}
      onCreate={() => actions.onCreateUser(state)}
      onUpdate={() => actions.onUpdateUser(state)}
      onDelete={() => actions.onDeleteUser(state)}
    />
  );
}

type ViewProps = {
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  onCreate: () => void;
  onUpdate: () => void;
  onDelete: () => void;
};

function ControlsView({
  canCreate,
  canUpdate,
  canDelete,
  onCreate,
  onUpdate,
  onDelete
}: ViewProps) {
  return (
    <div>
      <button disabled={!canCreate} onClick={onCreate}>
        Create
      </button>
      <button disabled={!canUpdate} onClick={onUpdate}>
        Update
      </button>
      <button disabled={!canDelete} onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}

export { Controls };
