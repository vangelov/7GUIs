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
      errorMessage={cell.errorMessage.value}
      onEditStart={() => actions.onCellEditStart(state, position)}
      onEdit={(formula: string) => actions.onCellEdit(state, position, formula)}
      onEditEnd={() => {
        try {
          actions.onCellEditEnd(state, position);
        } catch (e: any) {
          alert(e.messsage);
        }
      }}
    />
  );
}

// ---

type ViewProps = {
  isFocused?: boolean;
  value?: number;
  formula: string;
  errorMessage?: string;
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
  onEditEnd,
  errorMessage
}: ViewProps) {
  function onInputKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      onEditEnd();
    }
  }

  const highlightColor = errorMessage ? 'red' : isFocused ? 'green' : undefined;

  return (
    <td
      className="CellItem"
      onDoubleClick={() => (isFocused ? undefined : onEditStart())}
      style={{
        border: highlightColor ? `0.5px solid ${highlightColor}` : undefined,
        backgroundColor: highlightColor
      }}
      title={errorMessage}
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
