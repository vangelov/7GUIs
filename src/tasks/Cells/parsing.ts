import { EMPTY_NODE, FormulaNode, Operator } from './formula';
import { Token, tokenize } from './tokens';

type ParseState = {
  tokens: Token[];
  lookahead: Token;
};

function parse(formulaString: string): FormulaNode {
  const tokens = tokenize(formulaString.replace(/\s+/g, ''));
  console.log('t', formulaString.replace(/\s+/g, ''), tokens);

  if (tokens.length === 0) return EMPTY_NODE;

  const state: ParseState = {
    tokens,
    lookahead: tokens[0]
  };

  switch (state.lookahead.kind) {
    case 'decimal':
      const n = state.lookahead.value;
      return { kind: 'number', value: parseFloat(n) };
    case 'equals':
      return parseExpression(getNextState(state)).node;
    case 'epsilon':
      return EMPTY_NODE;
    default:
      return { kind: 'text', value: formulaString };
  }
}

function getNextState(state: ParseState): ParseState {
  const nextTokens = state.tokens.slice(1);
  const nextLookahead: Token =
    nextTokens.length === 0 ? { kind: 'epsilon', value: '' } : nextTokens[0];

  return {
    tokens: nextTokens,
    lookahead: nextLookahead
  };
}

function parseExpression(initialState: ParseState): {
  node: FormulaNode;
  state: ParseState;
} {
  let state = initialState;

  switch (state.lookahead.kind) {
    case 'cell':
      const c = state.lookahead.value.charCodeAt(0) - 'A'.charCodeAt(0);
      const r = parseInt(state.lookahead.value.slice(1));
      state = getNextState(state);
      if (state.lookahead.kind === 'colon') {
        // Range
        state = getNextState(state);

        if (state.lookahead.kind === 'cell') {
          const c2 = state.lookahead.value.charCodeAt(0) - 'A'.charCodeAt(0);
          const r2 = parseInt(state.lookahead.value.slice(1));

          state = getNextState(state);

          return {
            node: {
              kind: 'range',
              startCoord: { kind: 'coord', row: r, col: c },
              endCoord: { kind: 'coord', row: r2, col: c2 }
            },
            state
          };
        } else {
          throw new Error('Incorrect Range: ' + state.lookahead.value);
        }
      } else {
        return { node: { kind: 'coord', row: r, col: c }, state };
      }
    case 'decimal':
      const f = parseFloat(state.lookahead.value);
      state = getNextState(state);
      return { node: { kind: 'number', value: f }, state };
    case 'ident':
      const g = parseApplication(state);
      return {
        node: g.node,
        state: getNextState(g.state)
      };
    default:
      throw new Error('Incorrect Expression: ' + state.lookahead.value);
  }
}

function parseApplication(initialState: ParseState): {
  node: FormulaNode;
  state: ParseState;
} {
  let state = initialState;
  const operator = state.lookahead.value as Operator;

  state = getNextState(state);

  if (state.lookahead.kind !== 'open_bracket') {
    throw new Error('No opening bracket: ' + operator);
  }

  state = getNextState(state);

  const args: FormulaNode[] = [];

  while (true) {
    if (state.lookahead.kind === 'epsilon') {
      throw new Error('No closing bracket');
    }

    const expressionResult = parseExpression(state);
    state = expressionResult.state;

    args.push(expressionResult.node);

    if (state.lookahead.kind === 'comma') {
      state = getNextState(state);
    }

    console.log('S', state);

    if (state.lookahead.kind === 'close_bracket') {
      return { node: { kind: 'operation', args, operator }, state };
    }
  }
}
export { parse };
