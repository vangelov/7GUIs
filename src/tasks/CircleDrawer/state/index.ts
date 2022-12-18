import { signal } from '@preact/signals-react';
import { State } from './types';

function getInitialState(): State {
  return {
    lastCircleId: signal(0),
    circles: signal([]),
    history: signal([]),
    historyIndex: signal(null),
    selectedCirleIndex: signal(null),
    adjustButtonPosition: signal(null),
    adjustDialogPosition: signal(null),
    dragging: {
      beforeDragPosition: signal(null),
      startDragPosition: signal(null)
    }
  };
}

export { getInitialState };
export * from './types';
export * as selectors from './selectors';
export * as actions from './actions';
