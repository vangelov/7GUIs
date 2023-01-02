import { HTMLAttributes, ReactNode } from 'react';

type Props = {
  name: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

function Task({ name, children, ...rest }: Props) {
  return (
    <div {...rest}>
      <h2>{name}</h2>
      {children}
    </div>
  );
}

export { Task };
