import { ReactNode } from 'react';
import { selectors, State } from 'tasks/CRUD/state';
import { UserItem } from './UserItem';
import './UsersList.css';

type ControllerProps = {
  state: State;
};

function UsersListController({ state }: ControllerProps) {
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

// ---

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

export { UsersListController as UsersList };
