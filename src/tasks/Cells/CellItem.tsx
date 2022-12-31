import { CellPosition, State, actions } from 'tasks/Cells/state';
import './CellItem.css';
import { evalNode, hasValue } from './formula';

type Props = {
  position: CellPosition;
  state: State;
};

function CellItem({ state, position }: Props) {
  const { row, col } = position;
  const { formula, isFocused, formulaNode } = state.cells[row][col].value;
  let value;

  console.log('render', position);

  if (formulaNode && hasValue(formulaNode)) {
    value = evalNode(
      formulaNode,
      (row: number, col: number) =>
        state.cells[row][col].value.formulaNode || {
          kind: 'number',
          value: 0
        }
    );
  }

  return (
    <CellItemView
      value={value}
      formula={formula}
      isFocused={isFocused}
      onEditStart={() => actions.onCellEditStart(state, position)}
      onEdit={(formula: string) => actions.onCellEdit(state, position, formula)}
      onEditEnd={() => actions.onCellEditEnd(state, position)}
    />
  );
}

type ViewProps = {
  isFocused?: boolean;
  value?: number;
  formula?: string;
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
  return (
    <td
      className="CellItem"
      onDoubleClick={() => (isFocused ? undefined : onEditStart())}
    >
      <input
        value={isFocused ? formula : value}
        readOnly={!isFocused}
        style={{
          outline: isFocused ? '2px solid forestgreen' : undefined
        }}
        onBlur={onEditEnd}
        onSubmit={onEditEnd}
        className="CellItem-Input"
        onChange={(event) => onEdit(event.target.value)}
      />
    </td>
  );
}

export { CellItem };
