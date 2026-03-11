import { buildMockCypher } from '../../src/kg/neo4jMock.js';
import { loadMockHoconFromInAnalyzer } from '../../src/kg/hoconMock.js';
import {
  createDriver,
  testConnection,
  runStatements,
  getKgAsJson,
  clearKg,
} from '../../src/kg/memgraphClient.js';

// ── helpers ──────────────────────────────────────────────────────────────────

function expectedFromHocon(parsed) {
  const pa = parsed.prompt_analysis || parsed;
  return {
    themes: (pa.themes || []).slice().sort(),
    prompt: (pa.prompt || []).slice().sort(),
  };
}

function comparableFromMemgraph(kgJson) {
  const themes = kgJson.nodes
    .filter(n => n.labels.includes('Theme'))
    .map(n => n.props.name)
    .sort();
  const prompt = kgJson.nodes
    .filter(n => n.labels.includes('PromptItem'))
    .map(n => n.props.name)
    .sort();
  return { themes, prompt };
}

// ── unit tests (always run, no live services needed) ─────────────────────────

describe('memgraph KG – unit', () => {
  it('builds non-empty Cypher statements from HOCON mock', () => {
    const hocon = loadMockHoconFromInAnalyzer();
    const stmts = buildMockCypher(hocon);
    expect(stmts.length).toBeGreaterThan(0);
    expect(stmts.every(s => typeof s === 'string')).toBe(true);
  });

  it('all statements are MERGE or MATCH operations', () => {
    const hocon = loadMockHoconFromInAnalyzer();
    const stmts = buildMockCypher(hocon);
    expect(stmts.every(s => /^(MERGE|MATCH)/.test(s))).toBe(true);
  });

  it('comparableFromMemgraph extracts themes and prompt items', () => {
    const mockKg = {
      nodes: [
        { labels: ['Theme'], props: { name: 'humai' } },
        { labels: ['Theme'], props: { name: 'nats' } },
        { labels: ['PromptItem'], props: { name: 'mock prompt' } },
        { labels: ['Prompt'], props: { name: 'mock' } },
      ],
      relationships: [],
    };
    const result = comparableFromMemgraph(mockKg);
    expect(result.themes).toEqual(['humai', 'nats']);
    expect(result.prompt).toEqual(['mock prompt']);
  });

  it('expectedFromHocon returns sorted themes and prompt', () => {
    const hocon = loadMockHoconFromInAnalyzer();
    const expected = expectedFromHocon(hocon);
    expect(expected.themes.length).toBeGreaterThan(0);
    expect(expected.prompt.length).toBeGreaterThan(0);
  });
});

// ── integration tests (skipped unless MEMGRAPH_URI is set) ───────────────────

const runMemgraphTest = process.env.MEMGRAPH_URI ? test : test.skip;

describe('memgraph KG – integration (requires MEMGRAPH_URI env)', () => {
  let driver;

  beforeAll(async () => {
    if (!process.env.MEMGRAPH_URI) return;
    driver = createDriver();
    const ok = await testConnection(driver);
    if (!ok) {
      await driver.close();
      driver = null;
    } else {
      await clearKg(driver);
    }
  });

  afterAll(async () => {
    if (driver) {
      await clearKg(driver);
      await driver.close();
    }
  });

  runMemgraphTest('connects to Memgraph successfully', async () => {
    expect(driver).not.toBeNull();
  });

  runMemgraphTest('inserts HOCON KG into Memgraph node by node', async () => {
    const hocon = loadMockHoconFromInAnalyzer();
    const stmts = buildMockCypher(hocon);
    await runStatements(driver, stmts);
    const kgJson = await getKgAsJson(driver);
    expect(kgJson.nodes.length).toBeGreaterThan(0);
  });

  runMemgraphTest('retrieved KG JSON matches HOCON structure', async () => {
    const hocon = loadMockHoconFromInAnalyzer();
    const expected = expectedFromHocon(hocon);
    const kgJson = await getKgAsJson(driver);
    const actual = comparableFromMemgraph(kgJson);
    expect(actual.themes).toEqual(expected.themes);
    expect(actual.prompt).toEqual(expected.prompt);
  });

  runMemgraphTest('relationships exist in retrieved KG', async () => {
    const kgJson = await getKgAsJson(driver);
    expect(kgJson.relationships.length).toBeGreaterThan(0);
    expect(kgJson.relationships.some(r => r.type === 'HAS_THEME')).toBe(true);
    expect(kgJson.relationships.some(r => r.type === 'HAS_ITEM')).toBe(true);
  });
});
