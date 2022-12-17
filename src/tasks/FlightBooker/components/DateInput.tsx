import { ChangeEvent } from 'react';

type Props = {
  isDisabled?: boolean;
  isInvalid?: boolean;
  value: string;
  onChange: (value: string) => void;
};

function DateInput({
  value,
  isDisabled = false,
  isInvalid = false,
  onChange
}: Props) {
  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    onChange(value);
  }

  return (
    <input
      value={value}
      onChange={onInputChange}
      disabled={isDisabled}
      style={{ backgroundColor: isInvalid ? 'tomato' : '' }}
    />
  );
}

export { DateInput };
