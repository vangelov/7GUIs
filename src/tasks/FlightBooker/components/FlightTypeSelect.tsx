import { ChangeEvent } from 'react';
import { FlightType } from 'tasks/FlightBooker/state';

type Props = {
  onChange: (value: FlightType) => void;
  value: FlightType;
};

function FlightTypeSelect({ value, onChange }: Props) {
  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    onChange(value as FlightType);
  }

  return (
    <select value={value} onChange={onSelectChange}>
      <option value="oneWay">One-way flight</option>
      <option value="return">Return flight</option>
    </select>
  );
}

export { FlightTypeSelect };
