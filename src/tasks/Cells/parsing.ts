// Adapted from: https://github.com/eugenkiss/7guis-React-TypeScript-MobX/blob/master/src/app/guis/cells/parser.ts

import { EMPTY_NODE, FormulaNode, Operator } from './formula';
import { Token, tokenize } from './tokens';

type ParsingPosition = {
  tokens: Token[];
  lookahead: Token;
};

function parse(formulaString: string): FormulaNode {
  const tokens = tokenize(formulaString.replace(/\s+/g, ''));

  if (tokens.length === 0) return EMPTY_NODE;

  const position: ParsingPosition = {
    tokens,
    lookahead: tokens[0]
  };

  switch (position.lookahead.kind) {
    case 'decimal':
      const n = position.lookahead.value;
      return { kind: 'number', value: parseFloat(n) };
    case 'equals':
      return parseExpression(getNextPosition(position)).node;
    case 'epsilon':
      return EMPTY_NODE;
    default:
      return { kind: 'text', value: formulaString };
  }
}

function getNextPosition(state: ParsingPosition): ParsingPosition {
  const nextTokens = state.tokens.slice(1);
  const nextLookahead: Token =
    nextTokens.length === 0 ? { kind: 'epsilon', value: '' } : nextTokens[0];

  return {
    tokens: nextTokens,
    lookahead: nextLookahead
  };
}

function parseExpression(initialPosition: ParsingPosition): {
  node: FormulaNode;
  position: ParsingPosition;
} {
  let position = initialPosition;

  switch (position.lookahead.kind) {
    case 'cell':
      const c = position.lookahead.value.charCodeAt(0) - 'A'.charCodeAt(0);
      const r = parseInt(position.lookahead.value.slice(1));
      position = getNextPosition(position);
      if (position.lookahead.kind === 'colon') {
        // Range
        position = getNextPosition(position);

        if (position.lookahead.kind === 'cell') {
          const c2 = position.lookahead.value.charCodeAt(0) - 'A'.charCodeAt(0);
          const r2 = parseInt(position.lookahead.value.slice(1));

          position = getNextPosition(position);

          return {
            node: {
              kind: 'range',
              startCoord: { kind: 'coord', row: r, col: c },
              endCoord: { kind: 'coord', row: r2, col: c2 }
            },
            position
          };
        } else {
          throw new Error('Incorrect Range: ' + position.lookahead.value);
        }
      } else {
        return { node: { kind: 'coord', row: r, col: c }, position };
      }
    case 'decimal':
      const f = parseFloat(position.lookahead.value);
      position = getNextPosition(position);
      return { node: { kind: 'number', value: f }, position };
    case 'ident':
      const g = parseApplication(position);
      return {
        node: g.node,
        position: getNextPosition(g.state)
      };
    default:
      throw new Error('Incorrect Expression: ' + position.lookahead.value);
  }
}

function parseApplication(initialPosition: ParsingPosition): {
  node: FormulaNode;
  state: ParsingPosition;
} {
  let position = initialPosition;
  const operator = position.lookahead.value as Operator;

  position = getNextPosition(position);

  if (position.lookahead.kind !== 'open_bracket') {
    throw new Error('No opening bracket: ' + operator);
  }

  position = getNextPosition(position);

  const args: FormulaNode[] = [];

  while (true) {
    if (position.lookahead.kind === 'epsilon') {
      throw new Error('No closing bracket');
    }

    const expressionResult = parseExpression(position);
    position = expressionResult.position;

    args.push(expressionResult.node);

    if (position.lookahead.kind === 'comma') {
      position = getNextPosition(position);
    }

    if (position.lookahead.kind === 'close_bracket') {
      return { node: { kind: 'operation', args, operator }, state: position };
    }
  }
}
export { parse };
