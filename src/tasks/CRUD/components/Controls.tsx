import { State, actions, selectors } from 'tasks/CRUD/state';

type Props = {
  state: State;
};

function Controls({ state }: Props) {
  function onCreateClick() {
    actions.createUser(state);
  }

  function onUpdateClick() {
    actions.updateUser(state);
  }

  function onDeleteClick() {
    actions.deleteUser(state);
  }

  return (
    <div>
      <button
        disabled={!selectors.canCreateUser(state)}
        onClick={onCreateClick}
      >
        Create
      </button>
      <button
        disabled={!selectors.canUpdateUser(state)}
        onClick={onUpdateClick}
      >
        Update
      </button>
      <button
        disabled={!selectors.canDeleteUser(state)}
        onClick={onDeleteClick}
      >
        Delete
      </button>
    </div>
  );
}

export { Controls };
