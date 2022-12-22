import { MouseEvent, ReactNode } from 'react';
import { actions, Position, State } from 'tasks/CircleDrawer/state';
import { CircleItem } from './CircleItem';
import './Canvas.css';

type Props = {
  state: State;
};

function Canvas({ state }: Props) {
  return (
    <CanvasView
      onBackgroundClick={(position) => actions.onCanvasSelect(state, position)}
    >
      {state.circles.value.map((circle, index) => (
        <CircleItem
          key={circle.peek().id}
          state={state}
          index={index}
          circle={circle}
        />
      ))}
    </CanvasView>
  );
}

type ViewProps = {
  children: ReactNode;
  onBackgroundClick: (position: Position) => void;
};

function CanvasView({ children, onBackgroundClick }: ViewProps) {
  function onRectClick(event: MouseEvent) {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const position = {
      x: event.clientX - boundingRect.x,
      y: event.clientY - boundingRect.y
    };
    onBackgroundClick(position);
  }

  return (
    <div className="Canvas">
      <svg width="100%" height="100%">
        <rect
          width="100%"
          height="100%"
          fill="var(--background-body)"
          onClick={onRectClick}
        />
        {children}
      </svg>
    </div>
  );
}

export { Canvas };
