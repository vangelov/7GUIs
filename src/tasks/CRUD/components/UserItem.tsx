import { Signal } from '@preact/signals-react';
import { User } from 'tasks/CRUD/state';
import { State, actions } from 'tasks/CRUD/state';
import './UserItem.css';

type ControllerProps = {
  user: Signal<User>;
  index: number;
  state: State;
};

function UserItemController({ user, state, index }: ControllerProps) {
  return (
    <UserItemView
      onSelect={() => actions.onSelectUser(state, index)}
      user={user.value}
      isSelected={state.selectedIndex.value === index}
    />
  );
}

type ViewProps = {
  user: User;
  isSelected: boolean;
  onSelect: () => void;
};

function UserItemView({ user, onSelect, isSelected }: ViewProps) {
  return (
    <div
      className="UserItem"
      style={{
        backgroundColor: isSelected ? 'var(--background)' : undefined
      }}
      onClick={onSelect}
    >
      {user.surname}, {user.name}
    </div>
  );
}

export { UserItemController as UserItem };
