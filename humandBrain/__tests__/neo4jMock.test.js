import { buildMockCypher } from '../src/kg/neo4jMock.js';

describe('Neo4j mock builder', () => {
  it('creates cypher statements for themes', () => {
    const parsed = {
      prompt_analysis: {
        prompt: ['mock prompt'],
        themes: ['humai', 'orchestration'],
      },
    };

    const statements = buildMockCypher(parsed);
    expect(statements.some((s) => s.includes('Theme'))).toBe(true);
    expect(statements.some((s) => s.includes('HAS_THEME'))).toBe(true);
  });
});
