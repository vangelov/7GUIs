import { ChangeEvent } from 'react';

type Props = {
  value: string;
  label: string;
  onChange: (value: string) => void;
};

function Input({ value, label, onChange }: Props) {
  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    onChange(value);
  }

  return (
    <div>
      <label>{label}</label>
      <input value={value} onChange={onInputChange} />
    </div>
  );
}

export { Input };
