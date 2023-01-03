import { ChangeEvent } from 'react';
import { actions, State } from 'tasks/CRUD/state';
import './FilterInput.css';

type ControllerProps = {
  state: State;
};

function FilterInputController({ state }: ControllerProps) {
  return (
    <FilterInputView
      value={state.filterPrefix.value}
      onChange={(value) => actions.onFilterChange(state, value)}
    />
  );
}

// ---

type ViewProps = {
  value: string;
  onChange: (value: string) => void;
};

function FilterInputView({ onChange, value }: ViewProps) {
  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    onChange(value);
  }

  return (
    <div className="FilterInput">
      <label style={{ marginRight: '10px', marginBottom: 0 }}>
        Filter prefix
      </label>

      <input
        value={value}
        style={{ margin: 0, flex: 1 }}
        onChange={onInputChange}
      />
    </div>
  );
}

export { FilterInputController as FilterInput };
