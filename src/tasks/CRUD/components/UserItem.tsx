import { Signal } from '@preact/signals-react';
import { User } from 'tasks/CRUD/state';
import { State, actions } from 'tasks/CRUD/state';
import './UserItem.css';

type Props = {
  user: Signal<User>;
  index: number;
  state: State;
};

function UserItem({ user, state, index }: Props) {
  return (
    <UserItemView
      onSelect={() => actions.selectUser(state, index)}
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

export { UserItem };
