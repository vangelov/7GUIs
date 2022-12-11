import {
  canCreateUser,
  canDeleteUser,
  canUpdateUser,
  createUser,
  deleteUser,
  State,
  updateUser
} from './state';

type Props = {
  state: State;
};

function Controls({ state }: Props) {
  function onCreateClick() {
    createUser(state);
  }

  function onUpdateClick() {
    updateUser(state);
  }

  function onDeleteClick() {
    deleteUser(state);
  }

  return (
    <div>
      <button disabled={!canCreateUser(state)} onClick={onCreateClick}>
        Create
      </button>
      <button disabled={!canUpdateUser(state)} onClick={onUpdateClick}>
        Update
      </button>
      <button disabled={!canDeleteUser(state)} onClick={onDeleteClick}>
        Delete
      </button>
    </div>
  );
}

export { Controls };
