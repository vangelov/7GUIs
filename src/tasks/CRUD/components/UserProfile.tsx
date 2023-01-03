import { actions, State, User } from 'tasks/CRUD/state';

type ControllerProps = {
  state: State;
};

function UserProfileController({ state }: ControllerProps) {
  return (
    <UserProfileView
      user={state.currentUser.value}
      onNameChange={(value) => actions.onNameChange(state, value)}
      onSurnameChange={(value) => actions.onSurnameChange(state, value)}
    />
  );
}

// ---

type ViewProps = {
  user: User;
  onNameChange: (value: string) => void;
  onSurnameChange: (value: string) => void;
};

function UserProfileView({ user, onNameChange, onSurnameChange }: ViewProps) {
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <label>Name</label>
        <input
          value={user.name}
          onChange={(event) => onNameChange(event.target.value)}
        />

        <label>Surname</label>
        <input
          value={user.surname}
          onChange={(event) => onSurnameChange(event.target.value)}
        />
      </div>
    </div>
  );
}

export { UserProfileController as UserProfile };
