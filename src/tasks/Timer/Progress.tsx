import { Signal } from '@preact/signals-core';

type Props = {
  elapsedInSeconds: Signal<number>;
  durationInSeconds: Signal<number>;
};

function Progress({ elapsedInSeconds, durationInSeconds }: Props) {
  return (
    <div>
      <p>Elapsed: {elapsedInSeconds.value.toFixed(1)}s</p>
      <meter
        style={{ width: '50%' }}
        value={elapsedInSeconds.value}
        min="0"
        max={durationInSeconds.value}
      />
    </div>
  );
}

export { Progress };
