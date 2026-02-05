const { Given, Then } = require('@cucumber/cucumber');

let config;

Given('the brain config is loaded', async function () {
  const { loadBrainConfig } = await import('../../src/config/configLoader.js');
  config = await loadBrainConfig();
});

Then('the brain config default MLL should be {string}', function (value) {
  if (!config?.defaults || config.defaults.MLL !== value) {
    throw new Error(`Expected MLL ${value}, got ${config?.defaults?.MLL}`);
  }
});

Then('the brain config default embedding model should be {string}', function (value) {
  if (!config?.defaults || config.defaults.embedding_model !== value) {
    throw new Error(
      `Expected embedding_model ${value}, got ${config?.defaults?.embedding_model}`,
    );
  }
});

Given('the dashboard config is loaded', async function () {
  const { loadDashboardConfig } = await import('../../src/config/configLoader.js');
  config = await loadDashboardConfig();
});

Then('the dashboard config default kg view should be {string}', function (value) {
  if (!config?.defaults || config.defaults['kg-view'] !== value) {
    throw new Error(`Expected kg-view ${value}, got ${config?.defaults?.['kg-view']}`);
  }
});

Then('the dashboard config should enable {string}', function (key) {
  if (!config?.['kg-nodes'] || config['kg-nodes'][key] !== true) {
    throw new Error(`Expected kg-nodes.${key} to be true`);
  }
});
