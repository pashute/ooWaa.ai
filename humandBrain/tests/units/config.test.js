import { loadBrainConfig } from '../../src/config/configLoader.js';

test('loads brain config defaults', async () => {
  const config = await loadBrainConfig();

  expect(config.defaults.MLL).toBe('mixtral');
  expect(config.defaults.embedding_model).toBe('nomic-embed-text');
});

