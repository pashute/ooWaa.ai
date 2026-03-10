const { Given, Then } = require('@cucumber/cucumber');

let logger;

Given('the logger is initialized', async function () {
  const imported = await import('../../../src/logger.js');
  logger = imported.default;
});

Then('the logger should have a level', function () {
  if (!logger.level) {
    throw new Error('Logger level is missing');
  }
});
