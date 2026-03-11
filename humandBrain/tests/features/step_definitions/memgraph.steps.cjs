const { Given, When, Then } = require('@cucumber/cucumber');

let hoconParsed;
let cypherStatements;
let memgraphDriver;
let kgJson;
let memgraphAvailable = false;

// ── shared steps ─────────────────────────────────────────────────────────────

Given('the mock HOCON is loaded from inAnalyzer.md', async function () {
  const { loadMockHoconFromInAnalyzer } =
    await import('../../../src/kg/hoconMock.js');
  hoconParsed = loadMockHoconFromInAnalyzer();
});

Given('Memgraph is available', async function () {
  const { createDriver, testConnection } =
    await import('../../../src/kg/memgraphClient.js');
  memgraphDriver = createDriver();
  memgraphAvailable = await testConnection(memgraphDriver);
  if (!memgraphAvailable) {
    return 'pending'; // Memgraph not reachable – mark scenario as pending
  }
  const { clearKg } = await import('../../../src/kg/memgraphClient.js');
  await clearKg(memgraphDriver);
});

Given('the mock HOCON KG has been stored in Memgraph', async function () {
  const { createDriver, testConnection, runStatements, clearKg } =
    await import('../../../src/kg/memgraphClient.js');
  const { loadMockHoconFromInAnalyzer } =
    await import('../../../src/kg/hoconMock.js');
  const { buildMockCypher } = await import('../../../src/kg/neo4jMock.js');

  memgraphDriver = createDriver();
  memgraphAvailable = await testConnection(memgraphDriver);
  if (!memgraphAvailable) {
    return 'pending'; // Memgraph not reachable – mark scenario as pending
  }
  hoconParsed = loadMockHoconFromInAnalyzer();
  const stmts = buildMockCypher(hoconParsed);
  await clearKg(memgraphDriver);
  const { runStatements: rs } =
    await import('../../../src/kg/memgraphClient.js');
  await rs(memgraphDriver, stmts);
});

// ── When ─────────────────────────────────────────────────────────────────────

When('I build Cypher statements from the HOCON', async function () {
  const { buildMockCypher } = await import('../../../src/kg/neo4jMock.js');
  cypherStatements = buildMockCypher(hoconParsed);
});

When('the KG is stored in Memgraph node by node', async function () {
  const { buildMockCypher } = await import('../../../src/kg/neo4jMock.js');
  const { runStatements } = await import('../../../src/kg/memgraphClient.js');
  cypherStatements = buildMockCypher(hoconParsed);
  await runStatements(memgraphDriver, cypherStatements);
});

When('I retrieve the KG as JSON from Memgraph', async function () {
  const { getKgAsJson } = await import('../../../src/kg/memgraphClient.js');
  kgJson = await getKgAsJson(memgraphDriver);
});

// ── Then – Cypher assertions ──────────────────────────────────────────────────

Then('the Cypher statements should include MERGE operations', function () {
  if (!cypherStatements.some(s => s.startsWith('MERGE'))) {
    throw new Error('Expected at least one MERGE statement');
  }
});

Then('the Cypher statements should reference Theme nodes', function () {
  if (!cypherStatements.some(s => s.includes('Theme'))) {
    throw new Error('Expected Theme nodes in Cypher');
  }
});

Then(
  'the Cypher statements should reference HAS_THEME relationships',
  function () {
    if (!cypherStatements.some(s => s.includes('HAS_THEME'))) {
      throw new Error('Expected HAS_THEME relationships in Cypher');
    }
  }
);

// ── Then – Memgraph assertions ────────────────────────────────────────────────

Then('Memgraph contains the Theme nodes', async function () {
  const { getKgAsJson } = await import('../../../src/kg/memgraphClient.js');
  kgJson = await getKgAsJson(memgraphDriver);
  const themes = kgJson.nodes.filter(n => n.labels.includes('Theme'));
  if (themes.length === 0) {
    throw new Error('No Theme nodes found in Memgraph');
  }
});

Then('Memgraph contains the PromptItem nodes', function () {
  const items = kgJson.nodes.filter(n => n.labels.includes('PromptItem'));
  if (items.length === 0) {
    throw new Error('No PromptItem nodes found in Memgraph');
  }
});

Then('the themes in the JSON match the HOCON themes', function () {
  const expected = (hoconParsed.prompt_analysis || hoconParsed).themes
    .slice()
    .sort();
  const actual = kgJson.nodes
    .filter(n => n.labels.includes('Theme'))
    .map(n => n.props.name)
    .sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `Themes mismatch.\nExpected: ${JSON.stringify(expected)}\nActual:   ${JSON.stringify(actual)}`
    );
  }
});

Then('the prompt items in the JSON match the HOCON prompt items', function () {
  const expected = (hoconParsed.prompt_analysis || hoconParsed).prompt
    .slice()
    .sort();
  const actual = kgJson.nodes
    .filter(n => n.labels.includes('PromptItem'))
    .map(n => n.props.name)
    .sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `Prompt items mismatch.\nExpected: ${JSON.stringify(expected)}\nActual:   ${JSON.stringify(actual)}`
    );
  }
});

Then('the JSON includes HAS_THEME relationships', function () {
  if (!kgJson.relationships.some(r => r.type === 'HAS_THEME')) {
    throw new Error('No HAS_THEME relationships found');
  }
});

Then('the JSON includes HAS_ITEM relationships', function () {
  if (!kgJson.relationships.some(r => r.type === 'HAS_ITEM')) {
    throw new Error('No HAS_ITEM relationships found');
  }
});
