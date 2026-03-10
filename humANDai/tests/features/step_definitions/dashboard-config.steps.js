const fs = require('fs');
const path = require('path');
const { Given, Then } = require('@cucumber/cucumber');

let kgViewValue;

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

Given('the dashboard config is loaded', function () {
  const filePath = path.resolve(
    process.cwd(),
    'src',
    'config',
    'settings.yaml',
  );
  const contents = fs.readFileSync(filePath, 'utf8');
  kgViewValue = extractDefaultsKgView(contents);
});

Then('the dashboard config should include defaults.kg-view', function () {
  if (!kgViewValue) {
    throw new Error('Expected defaults.kg-view to be defined');
  }
});

Then('the dashboard kg-view should be one of:', function (dataTable) {
  const allowed = dataTable.raw().flat();
  if (!allowed.includes(kgViewValue)) {
    throw new Error(`Expected kg-view in [${allowed.join(', ')}], got ${kgViewValue}`);
  }
});

Then('the dashboard kg-view default should be {string}', function (expected) {
  if (kgViewValue !== expected) {
    throw new Error(`Expected kg-view ${expected}, got ${kgViewValue}`);
  }
});
