import { ChangeEvent } from 'react';
import { actions, State } from 'tasks/CRUD/state';

type Props = {
  state: State;
};

function FilterInput({ state }: Props) {
  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    actions.setFilterPrefix(state, value);
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '300px',
        alignItems: 'center',
        marginBottom: '10px'
      }}
    >
      <label style={{ marginRight: '10px', marginBottom: 0 }}>
        Filter prefix
      </label>

      <input
        value={state.filterPrefix.value}
        style={{ margin: 0, flex: 1 }}
        onChange={onInputChange}
      />
    </div>
  );
}

export { FilterInput };
