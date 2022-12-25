import { State } from './types';

function getUsers(state: State) {
  const lowercaseFilter = state.filterPrefix.value.toLowerCase();

  return state.users.value.filter((user) => {
    const lowercaseName = user.value.surname.toLowerCase();
    return lowercaseName.startsWith(lowercaseFilter);
  });
}

function getSelectedUser(state: State) {
  if (state.selectedIndex.value !== null) {
    return state.users.value[state.selectedIndex.value];
  }

  return null;
}

function canCreateUser(state: State) {
  return (
    Boolean(state.currentUser.value.name) &&
    Boolean(state.currentUser.value.surname)
  );
}

function canUpdateUser(state: State) {
  return state.selectedIndex.value !== null;
}

function canDeleteUser(state: State) {
  return state.selectedIndex.value !== null;
}

export {
  getUsers,
  getSelectedUser,
  canCreateUser,
  canUpdateUser,
  canDeleteUser
};
