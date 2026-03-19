import { buildMockCypher } from '../../src/kg/neo4jMock.js';
import { loadMockHoconFromInAnalyzer } from '../../src/kg/hoconMock.js';

describe('benchgraph – KG operation timing (Issue #43)', () => {
  it('HOCON parse completes in under 100 ms', () => {
    const start = Date.now();
    const hocon = loadMockHoconFromInAnalyzer();
    const elapsed = Date.now() - start;
    expect(hocon).toBeDefined();
    expect(elapsed).toBeLessThan(100);
  });

  it('Cypher build from parsed HOCON completes in under 50 ms', () => {
    const hocon = loadMockHoconFromInAnalyzer();
    const start = Date.now();
    const stmts = buildMockCypher(hocon);
    const elapsed = Date.now() - start;
    expect(stmts.length).toBeGreaterThan(0);
    expect(elapsed).toBeLessThan(50);
  });

  it('repeated HOCON parse (× 100) stays under 500 ms total', () => {
    const start = Date.now();
    for (let i = 0; i < 100; i++) {
      loadMockHoconFromInAnalyzer();
    }
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(500);
  });

  it('repeated Cypher build (× 1000) stays under 200 ms total', () => {
    const hocon = loadMockHoconFromInAnalyzer();
    const start = Date.now();
    for (let i = 0; i < 1000; i++) {
      buildMockCypher(hocon);
    }
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(200);
  });
});
