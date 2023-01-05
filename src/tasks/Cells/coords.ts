type Coord = {
  row: number;
  col: number;
};

function parseCoord(value: string): Coord {
  const col = value.charCodeAt(0) - 'A'.charCodeAt(0);
  const row = parseInt(value.slice(1)) - 1;

  return { row, col };
}

function stringifyCoord({ row, col }: Coord) {
  const colPart = String.fromCharCode('A'.charCodeAt(0) + col);
  const rowPart = (row + 1).toString();

  return colPart + rowPart;
}

export { parseCoord, stringifyCoord };
