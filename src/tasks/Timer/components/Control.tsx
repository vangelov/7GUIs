import { cloneElement, ReactElement } from 'react';

type Props = {
  label: string;
  value: string;
  children: ReactElement;
};

function Control({ label, value, children }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label style={{ width: '150px' }}>
        <b>{label}:</b> {value}
      </label>

      {cloneElement(children, { style: { width: '50%' } })}
    </div>
  );
}

export { Control };
