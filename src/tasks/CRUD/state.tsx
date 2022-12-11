import { signal, Signal } from '@preact/signals-core';

type User = {
  id?: number;
  name: string;
  surname: string;
};

type State = {
  filterPrefix: Signal<string>;
  users: Signal<Signal<User>[]>;
  selectedIndex: Signal<number | null>;
  currentUser: Signal<User>;
  lastId: Signal<number>;
};

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

function getSelectedUser(state: State) {
  if (state.selectedIndex.value !== null) {
    return state.users.value[state.selectedIndex.value];
  }

  return null;
}

function selectUser(state: State, index: number) {
  const user = state.users.value[index];
  state.selectedIndex.value = index;
  setCurrentUser(state, user.value);
}

function canCreateUser(state: State) {
  return state.currentUser.value.name && state.currentUser.value.surname;
}

function canUpdateUser(state: State) {
  return state.selectedIndex.value !== null;
}

function canDeleteUser(state: State) {
  return state.selectedIndex.value !== null;
}

export {
  createUser,
  deleteUser,
  updateUser,
  setFilterPrefix,
  getUsers,
  selectUser,
  getSelectedUser,
  setCurrentUser,
  canCreateUser,
  canUpdateUser,
  canDeleteUser,
  EMPTY_USER
};

export type { State, User };
