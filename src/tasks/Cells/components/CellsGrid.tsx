import { ReactNode } from 'react';
import { State } from 'tasks/Cells/state';
import { CellItem } from './CellItem';
import './CellsGrid.css';

type Props = {
  state: State;
};

function CellsGrid({ state }: Props) {
  const { cells } = state;

  return (
    <CellsGridView
      rows={cells.length}
      cols={cells[0].length}
      getChildAt={(row, col) => (
        <CellItem key={col} state={state} position={{ row, col }} />
      )}
    />
  );
}

type ViewProps = {
  rows: number;
  cols: number;
  getChildAt: (row: number, col: number) => ReactNode;
};

function CellsGridView({ rows, cols, getChildAt }: ViewProps) {
  function renderCols(i: number) {
    const result: ReactNode[] = [];

    for (let j = 0; j < cols; j++) {
      result.push(getChildAt(i, j));
    }

    return result;
  }

  function renderRows() {
    const result: ReactNode[] = [];

    for (let i = 0; i < rows; i++) {
      result.push(
        <tr key={i}>
          <td
            className="CellsGrid-Coord"
            style={{
              left: 0
            }}
          >
            <b>{i}</b>
          </td>

          {renderCols(i)}
        </tr>
      );
    }

    return result;
  }

  function renderHeader() {
    const result = [
      <th
        key={-1}
        className="CellsGrid-Coord"
        style={{
          width: 30,
          left: 0,
          top: 0,
          zIndex: 1
        }}
      >
        {' '}
      </th>
    ];

    const start = 'A'.charCodeAt(0);
    for (let i = start; i < start + cols; i++) {
      result.push(
        <th
          key={i}
          className="CellsGrid-Coord"
          style={{
            top: 0
          }}
        >
          {String.fromCharCode(i)}
        </th>
      );
    }

    return result;
  }

  return (
    <div className="CellsGrid">
      <table className="CellsGrid-Table">
        <tbody>
          <tr>{renderHeader()}</tr>

          {renderRows()}
        </tbody>
      </table>
    </div>
  );
}

export { CellsGrid };
