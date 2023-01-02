// Adapted from: https://github.com/eugenkiss/7guis-React-TypeScript-MobX/blob/master/src/app/guis/cells/parser.ts

type TokenKind =
  | 'epsilon'
  | 'equals'
  | 'ident'
  | 'decimal'
  | 'open_bracket'
  | 'close_bracket'
  | 'comma'
  | 'colon'
  | 'cell';

type Matcher = {
  kind: TokenKind;
  regex: string;
};

type Token = {
  kind: TokenKind;
  value: string;
};

const matchers: Matcher[] = [
  { kind: 'cell', regex: '[a-zA-Z_]\\d+' },
  { kind: 'equals', regex: '=' },
  { kind: 'ident', regex: '[a-zA-Z_]\\w*' },
  { kind: 'decimal', regex: '-?\\d+(\\.\\d*)?' },
  { kind: 'open_bracket', regex: '\\(' },
  { kind: 'close_bracket', regex: '\\)' },
  { kind: 'comma', regex: ',' },
  { kind: 'colon', regex: ':' }
];

function tokenize(s: string): Token[] {
  const tokens: Token[] = [];

  while (s !== '') {
    let match = false;

    for (const matcher of matchers) {
      const result = s.match('^' + matcher.regex);

      if (result != null) {
        match = true;
        const t = result[0].trim();
        tokens.push({ kind: matcher.kind, value: t });
        s = s.slice(result[0].length);

        break;
      }
    }

    if (!match) {
      throw new Error('Unexpected char in input: ' + s);
    }
  }

  return tokens;
}

export type { Token };

export { tokenize };
