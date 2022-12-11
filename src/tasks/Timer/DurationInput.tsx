import { ChangeEvent } from 'react';
import { MAX_DURATION_IN_SECONDS } from './state';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

function DurationInput({ value, onChange }: Props) {
  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    onChange(Number(value));
  }

  return (
    <input
      style={{ width: '50%' }}
      type="range"
      min={0}
      max={MAX_DURATION_IN_SECONDS}
      step={0.1}
      value={value}
      onChange={onInputChange}
    />
  );
}

export { DurationInput };
