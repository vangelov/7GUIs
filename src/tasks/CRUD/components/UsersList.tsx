import { ReactNode } from 'react';
import { selectors, State } from 'tasks/CRUD/state';
import { UserItem } from './UserItem';
import './UsersList.css';

type Props = {
  state: State;
};

function UsersList({ state }: Props) {
  const users = selectors.getUsers(state);

  return (
    <UsersListView>
      {users.map((user, index) => (
        <UserItem
          key={user.peek().id}
          index={index}
          state={state}
          user={user}
        />
      ))}
    </UsersListView>
  );
}

type ViewProps = {
  children: ReactNode;
};

function UsersListView({ children }: ViewProps) {
  return (
    <div className="UsersList">
      <div style={{ overflow: 'auto', maxHeight: '100%' }}>{children}</div>
    </div>
  );
}

export { UsersList };
