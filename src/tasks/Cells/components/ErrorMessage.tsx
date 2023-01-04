import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function ErrorMessage({ children }: Props) {
  return (
    <p style={{ color: 'red' }}>
      <b>Error:</b> {children}
    </p>
  );
}

export { ErrorMessage };
