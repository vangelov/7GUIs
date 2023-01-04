import { HTMLAttributes, ReactNode } from 'react';

type Props = {
  name: string;
  prompt?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

function Task({ name, children, prompt, ...rest }: Props) {
  return (
    <div {...rest}>
      <h2>{name}</h2>
      {prompt && (
        <p>
          <i>{prompt}</i>
        </p>
      )}
      {children}
    </div>
  );
}

export { Task };
