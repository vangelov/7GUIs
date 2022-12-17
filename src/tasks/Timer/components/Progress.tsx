import { State } from 'tasks/Timer/state';

type Props = {
  state: State;
};

function Progress({ state }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label style={{ width: '150px' }}>
        <b>Elapsed:</b> {state.elapsedInSeconds.value.toFixed(1)}s
      </label>

      <meter
        style={{ width: '50%' }}
        value={state.elapsedInSeconds.value}
        min="0"
        max={state.durationInSeconds.value}
      />
    </div>
  );
}

export { Progress };
