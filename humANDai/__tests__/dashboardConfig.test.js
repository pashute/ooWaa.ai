const fs = require('fs');
const path = require('path');

const extractDefaultsKgView = (contents) => {
  const lines = contents.split(/\r?\n/);
  let inDefaults = false;

  for (const line of lines) {
    if (/^\S/.test(line)) {
      inDefaults = line.startsWith('defaults:');
      continue;
    }

    if (!inDefaults) {
      continue;
    }

    const match = line.match(/^\s+kg-view:\s*([^\s#]+)/);
    if (match) {
      return match[1];
    }
  }

  return null;
};

test('dashboard config defaults.kg-view is valid', () => {
  const filePath = path.resolve(
    process.cwd(),
    'src',
    'config',
    'dashboard.config.yaml',
  );
  const contents = fs.readFileSync(filePath, 'utf8');
  const kgViewValue = extractDefaultsKgView(contents);
  const allowed = ['kg-network', 'kg-map', 'kg-lexicon'];

  expect(kgViewValue).toBe('kg-network');
  expect(allowed).toContain(kgViewValue);
});
