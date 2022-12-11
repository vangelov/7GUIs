import { ReactNode } from 'react';

type Props = {
  name: string;
  children: ReactNode;
};

function Task({ name, children }: Props) {
  return (
    <div>
      <h2>{name}</h2>
      {children}
    </div>
  );
}

export { Task };
