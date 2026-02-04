import { orchestrateTestMessage } from '../src/orchestrator.js';

describe('orchestrateTestMessage', () => {
  it('returns testReceived with module results', () => {
    const message = { type: 'testSent', payload: 'test message' };
    const result = orchestrateTestMessage(message);

    expect(result.type).toBe('testReceived');
    expect(result.original).toEqual(message);

    const modules = result.results.map((r) => r.module);
    expect(modules).toEqual(
      expect.arrayContaining([
        'inAnalyzer',
        'outAnalyzer',
        'flowMngr',
        'strollAnalyzer',
        'respondMngr',
        'awareMngr',
        'alignMngr',
        'knowledgeMngr',
      ])
    );
  });
});
