import { ChangeEvent } from 'react';
import { actions, State } from 'tasks/CRUD/state';

type Props = {
  state: State;
};

function UserProfile({ state }: Props) {
  function onNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    actions.setCurrentUser(state, { ...state.currentUser.value, name: value });
  }

  function onSurnameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    actions.setCurrentUser(state, {
      ...state.currentUser.value,
      surname: value
    });
  }

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label>Name</label>
        <input value={state.currentUser.value.name} onChange={onNameChange} />

        <label>Surname</label>
        <input
          value={state.currentUser.value.surname}
          onChange={onSurnameChange}
        />
      </div>
    </div>
  );
}

export { UserProfile };