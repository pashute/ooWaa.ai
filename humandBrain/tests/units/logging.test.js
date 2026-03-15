import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('backend does not log to console', async () => {
  const targetPath = path.resolve(__dirname, '../../src/index.js');
  const contents = await fs.readFile(targetPath, 'utf8');

  expect(contents).not.toMatch(/\bconsole\.(log|info|warn)\b/);
});
