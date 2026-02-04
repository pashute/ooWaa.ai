import { strollAnalyzer } from '../src/modules/strollAnalyzer.js';
import { alignMngr } from '../src/modules/alignMngr.js';
import { knowledgeMngr } from '../src/modules/knowledgeMngr.js';

describe('module handlers', () => {
  const message = { type: 'testSent', payload: 'test message' };

  it('strollAnalyzer returns ok status', () => {
    expect(strollAnalyzer(message)).toEqual({
      module: 'strollAnalyzer',
      status: 'ok',
      input: message,
    });
  });

  it('alignMngr returns ok status', () => {
    expect(alignMngr(message)).toEqual({
      module: 'alignMngr',
      status: 'ok',
      input: message,
    });
  });

  it('knowledgeMngr returns ok status', () => {
    expect(knowledgeMngr(message)).toEqual({
      module: 'knowledgeMngr',
      status: 'ok',
      input: message,
    });
  });
});
