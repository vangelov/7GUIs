import { State } from 'tasks/Timer/state';
import { Control } from './Control';

type ControllerProps = {
  state: State;
};

function ProgressController({ state }: ControllerProps) {
  return (
    <Control
      label="Elapsed:"
      value={`${state.elapsedInSeconds.value.toFixed(1)}s`}
    >
      <meter
        value={state.elapsedInSeconds.value}
        min="0"
        max={state.durationInSeconds.value}
      />
    </Control>
  );
}

export { ProgressController as Progress };
