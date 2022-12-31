import { CellPosition, State, actions } from 'tasks/Cells/state';
import './CellItem.css';
import { KeyboardEvent } from 'react';
import { evalNode, hasValue } from './formula';

type Props = {
  position: CellPosition;
  state: State;
};

function CellItem({ state, position }: Props) {
  const { cells } = state;
  const cell = cells[position.row][position.col];
  let value = undefined;

  if (cell.formulaNode.value && hasValue(cell.formulaNode.value)) {
    value = evalNode(
      cell.formulaNode.value,
      (row, col) => cells[row][col].formulaNode.value
    );
  }

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
    >
      <input
        value={isFocused || value === undefined ? formula : value}
        readOnly={!isFocused}
        onBlur={onEditEnd}
        onKeyUp={onInputKeyUp}
        className={`CellItem-Input ${
          isFocused ? 'CellItem-Input-Focused' : ''
        }`}
        onChange={(event) => onEdit(event.target.value)}
      />
    </td>
  );
}

export { CellItem };
