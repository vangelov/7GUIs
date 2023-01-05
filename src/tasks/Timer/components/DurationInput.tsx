import { MAX_DURATION_IN_SECONDS } from 'tasks/Timer/state';
import { Control } from './Control';

type Props = {
  value: number;
  onChange: (value: number) => void;
};

function DurationInput({ value, onChange }: Props) {
  return (
    <Control label="Duration:" value={value + 's'}>
      <input
        type="range"
        min={0}
        max={MAX_DURATION_IN_SECONDS}
        step={0.1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </Control>
  );
}

export { DurationInput };
