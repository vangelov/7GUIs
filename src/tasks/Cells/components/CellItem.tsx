import { CellPosition, State, actions } from 'tasks/Cells/state';
import './CellItem.css';
import { KeyboardEvent } from 'react';
import { getCellValue } from 'tasks/Cells/state/selectors';

type ControllerProps = {
  position: CellPosition;
  state: State;
};

function CellItemController({ state, position }: ControllerProps) {
  const { cells } = state;
  const cell = cells[position.row][position.col];
  const value = getCellValue(state, cell);

  return (
    <CellItemView
      value={value}
      formula={cell.formula.value}
      isFocused={cell.isFocused.value}
      onEditStart={() => actions.onCellEditStart(state, position)}
      onEdit={(formula: string) => actions.onCellEdit(state, position, formula)}
      onEditEnd={() => actions.onCellEditEnd(state, position)}
    />
  );
}

// ---

type ViewProps = {
  isFocused?: boolean;
  value?: number;
  formula: string;
  onEditStart: () => void;
  onEdit: (value: string) => void;
  onEditEnd: () => void;
};

function CellItemView({
  isFocused,
  formula,
  value,
  onEditStart,
  onEdit,
  onEditEnd
}: ViewProps) {
  function onInputKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onEditEnd();
    }
  }

  return (
    <td
      className="CellItem"
      onDoubleClick={() => (isFocused ? undefined : onEditStart())}
      style={{
        border: isFocused ? '0.5px solid green' : undefined,
        backgroundColor: isFocused ? 'green' : undefined
      }}
    >
      <input
        className="CellItem-Input"
        value={isFocused || value === undefined ? formula : value}
        style={{
          fontFamily:
            isFocused && formula.startsWith('=') ? 'monospace' : undefined
        }}
        readOnly={!isFocused}
        onBlur={onEditEnd}
        onKeyUp={onInputKeyUp}
        onChange={(event) => onEdit(event.target.value)}
      />
    </td>
  );
}

export { CellItemController as CellItem };
