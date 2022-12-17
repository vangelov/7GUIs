import { signal } from '@preact/signals-core';
import { State, User } from './types';

const EMPTY_USER = { name: '', surname: '' };

function setCurrentUser(state: State, user: User) {
  state.currentUser.value = user;
}

function createUser(state: State) {
  state.lastId.value = state.lastId.value + 1;

  state.users.value = [
    ...state.users.value,
    signal({ ...state.currentUser.value, id: state.lastId.value })
  ];

  state.currentUser.value = EMPTY_USER;
  state.selectedIndex.value = null;
}

function deleteUser(state: State) {
  const index = state.selectedIndex.value;

  if (index !== null) {
    state.users.value = [
      ...state.users.value.slice(0, index),
      ...state.users.value.slice(index + 1)
    ];

    state.selectedIndex.value = null;
    state.currentUser.value = EMPTY_USER;
  }
}

function updateUser(state: State) {
  const index = state.selectedIndex.value;

  if (index !== null) {
    state.users.value[index].value = { ...state.currentUser.value };
  }
}

function setFilterPrefix(state: State, value: string) {
  state.filterPrefix.value = value;
}

function getUsers(state: State) {
  const lowercaseFilter = state.filterPrefix.value.toLowerCase();

  return state.users.value.filter((user) => {
    const lowercaseName = user.value.surname.toLowerCase();
    return lowercaseName.startsWith(lowercaseFilter);
  });
}

function selectUser(state: State, index: number) {
  const user = state.users.value[index];
  state.selectedIndex.value = index;
  setCurrentUser(state, user.value);
}

export {
  setCurrentUser,
  createUser,
  deleteUser,
  updateUser,
  setFilterPrefix,
  getUsers,
  selectUser,
  EMPTY_USER
};
