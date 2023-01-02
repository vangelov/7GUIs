import { signal } from '@preact/signals-react';
import { State } from './types';

function getInitialState(): State {
  return {
    lastCircleId: signal(0),
    circles: signal([]),
    selectedCirleIndex: signal(null),

    history: signal([[]]),
    historyIndex: signal(0),

    adjustDialogPosition: signal(null),

    initialPointerPosition: signal(null),
    initialObjectPosition: signal(null),

    radiusChanged: signal(false)
  };
}

export { getInitialState };
export * from './types';
export * as selectors from './selectors';
export * as actions from './actions';
