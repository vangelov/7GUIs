import { MouseEvent } from 'react';
import { actions, State } from 'tasks/CircleDrawer/state';
import { CircleItem } from './CircleItem';

type Props = {
  state: State;
};

function Canvas({ state }: Props) {
  function onClick(event: MouseEvent) {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - boundingRect.x,
      y: event.clientY - boundingRect.y
    };
    actions.onCanvasSelect(state, position);
  }

  return (
    <div
      style={{
        borderColor: 'var(--border)',
        borderRadius: '6px',
        borderWidth: 1,
        borderStyle: 'solid',
        width: '400px',
        height: '400px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <svg width="100%" height="100%">
        <rect
          width="100%"
          height="100%"
          fill="var(--background-body)"
          onClick={onClick}
        />
        {state.circles.value.map((circle, index) => (
          <CircleItem
            key={circle.peek().id}
            state={state}
            index={index}
            circle={circle}
          />
        ))}
      </svg>
    </div>
  );
}

export { Canvas };
