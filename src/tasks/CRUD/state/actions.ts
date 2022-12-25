import { signal } from '@preact/signals-react';
import { State } from './types';

const EMPTY_USER = { name: '', surname: '' };

function onNameChange(state: State, value: string) {
  state.currentUser.value = { ...state.currentUser.value, name: value };
}

function onSurnameChange(state: State, value: string) {
  state.currentUser.value = { ...state.currentUser.value, surname: value };
}

function onCreateUser(state: State) {
  state.lastId.value = state.lastId.value + 1;

  state.users.value = [
    ...state.users.value,
    signal({ ...state.currentUser.value, id: state.lastId.value })
  ];

  state.currentUser.value = EMPTY_USER;
  state.selectedIndex.value = null;
}

function onDeleteUser(state: State) {
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

function onUpdateUser(state: State) {
  const index = state.selectedIndex.value;

  if (index !== null) {
    state.users.value[index].value = { ...state.currentUser.value };
  }
}

function onFilterChange(state: State, value: string) {
  state.filterPrefix.value = value;
}

function selectUser(state: State, index: number) {
  const user = state.users.value[index];
  state.selectedIndex.value = index;
  state.currentUser.value = user.value;
}

export {
  onNameChange,
  onSurnameChange,
  onCreateUser,
  onDeleteUser,
  onUpdateUser,
  onFilterChange,
  selectUser,
  EMPTY_USER
};
