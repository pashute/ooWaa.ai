const { Given, When, Then } = require('@cucumber/cucumber');

let parsed;
let statements;

Given('the mock HOCON fixture is loaded', async function () {
  const { loadMockHoconFromInAnalyzer } = await import('../../src/kg/hoconMock.js');
  parsed = loadMockHoconFromInAnalyzer();
});

When('I build Cypher from the mock HOCON', async function () {
  const { buildMockCypher } = await import('../../src/kg/neo4jMock.js');
  statements = buildMockCypher(parsed);
});

Then('the Cypher should include Theme nodes', function () {
  if (!statements.some((s) => s.includes('Theme'))) {
    throw new Error('Expected Theme nodes in cypher');
  }
});

Then('the Cypher should include HAS_THEME relationships', function () {
  if (!statements.some((s) => s.includes('HAS_THEME'))) {
    throw new Error('Expected HAS_THEME relationships in cypher');
  }
});
