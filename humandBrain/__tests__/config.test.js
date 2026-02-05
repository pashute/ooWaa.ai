import { loadBrainConfig, loadDashboardConfig } from '../src/config/configLoader.js';

test('loads brain config defaults', async () => {
  const config = await loadBrainConfig();

  expect(config.defaults.MLL).toBe('mixtral');
  expect(config.defaults.embedding_model).toBe('nomic-embed-text');
});

test('loads dashboard config defaults', async () => {
  const config = await loadDashboardConfig();

  expect(config.defaults['kg-view']).toBe('kg-nodes');
  expect(config['kg-nodes']['kg-map']).toBe(true);
  expect(config['kg-nodes']['kg-lexicon']).toBe(true);
});
