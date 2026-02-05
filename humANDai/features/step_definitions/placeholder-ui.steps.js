import fs from 'fs';
import path from 'path';
import { Given, Then } from '@cucumber/cucumber';

let appSource;

Given('the app is launched', function () {
  const filePath = path.resolve(process.cwd(), 'App.js');
  appSource = fs.readFileSync(filePath, 'utf8');
});

Then('I should see the title {string}', function (expectedTitle) {
  if (!appSource.includes(expectedTitle)) {
    throw new Error(`Expected to find title "${expectedTitle}"`);
  }
});

Then('I should see the subtitle {string}', function (expectedSubtitle) {
  if (!appSource.includes(expectedSubtitle)) {
    throw new Error(`Expected to find subtitle "${expectedSubtitle}"`);
  }
});

Then('I should see the description {string}', function (expectedDescription) {
  if (!appSource.includes(expectedDescription)) {
    throw new Error(`Expected to find description "${expectedDescription}"`);
  }
});
