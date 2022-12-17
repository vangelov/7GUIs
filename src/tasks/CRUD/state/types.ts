import { Signal } from '@preact/signals-core';

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

export type { User, State };
