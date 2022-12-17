import { actions, selectors, State } from 'tasks/CRUD/state';
import { UserItem } from './UserItem';

type Props = {
  state: State;
};

function UsersList({ state }: Props) {
  const users = selectors.getUsers(state);

  function onUserSelect(index: number) {
    actions.selectUser(state, index);
  }

  return (
    <div
      style={{
        borderStyle: 'solid',
        borderColor: 'var(--border)',
        borderRadius: '6px',
        marginBottom: '10px',
        overflow: 'hidden',
        marginRight: '10px',
        width: '300px',
        height: '190px'
      }}
    >
      <div style={{ overflow: 'auto', maxHeight: '100%' }}>
        {users.map((user, index) => (
          <UserItem
            key={user.value.id}
            index={index}
            isSelected={state.selectedIndex.value === index}
            user={user.value}
            onSelect={onUserSelect}
          />
        ))}
      </div>
    </div>
  );
}

export { UsersList };
