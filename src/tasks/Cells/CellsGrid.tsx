import { State } from 'tasks/Cells/state';
import { CellItem } from './CellItem';
import './CellsGrid.css';

type Props = {
  state: State;
};

function CellsGrid({ state }: Props) {
  const { cells } = state;

  return (
    <div style={{ overflow: 'scroll', height: '300px' }}>
      <table className="CellsGrid">
        <tbody>
          <tr style={{ background: '#f6f6f6', userSelect: 'none' }}>
            {(() => {
              const result = [
                <th
                  key={-1}
                  style={{
                    width: 30,
                    position: 'sticky',
                    left: 0,
                    top: 0,
                    background: '#f6f6f6',
                    border: '0.5px solid #bbb',
                    zIndex: 1,
                    height: '40px'
                  }}
                >
                  {' '}
                </th>
              ];
              const start = 'A'.charCodeAt(0);
              for (let i = start; i < start + cells[0].length; i++) {
                result.push(
                  <th
                    key={i}
                    style={{
                      border: '0.5px solid #bbb',
                      position: 'sticky',
                      height: '40px',
                      top: 0,
                      background: '#f6f6f6'
                    }}
                  >
                    <div
                      style={{
                        padding: 1
                      }}
                    >
                      {String.fromCharCode(i)}
                    </div>
                  </th>
                );
              }
              return result;
            })()}
          </tr>
          {cells.map((row, i) => (
            <tr key={i}>
              <td
                style={{
                  background: '#f6f6f6',
                  border: '0.5px solid #bbb',
                  userSelect: 'none',
                  textAlign: 'center',
                  position: 'sticky',
                  left: 0
                }}
              >
                <b>{i}</b>
              </td>
              {row.map((cell, j) => (
                <CellItem key={j} position={{ row: i, col: j }} state={state} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { CellsGrid };
