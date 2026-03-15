const { Given, When, Then } = require('@cucumber/cucumber');

let message;
let moduleResult;
let orchestratorResult;

Given('a test message {string}', function (payload) {
  message = { type: 'testSent', payload };
});

When('I run module {string}', async function (moduleName) {
  const moduleMap = {
    inAnalyzer: '../../../src/modules/inAnalyzer.js',
    outAnalyzer: '../../../src/modules/outAnalyzer.js',
    flowMngr: '../../../src/modules/flowMngr.js',
    strollAnalyzer: '../../../src/modules/strollAnalyzer.js',
    respondMngr: '../../../src/modules/respondMngr.js',
    awareMngr: '../../../src/modules/awareMngr.js',
    alignMngr: '../../../src/modules/alignMngr.js',
    knowledgeMngr: '../../../src/modules/knowledgeMngr.js',
  };

  const modulePath = moduleMap[moduleName];
  if (!modulePath) {
    throw new Error(`Unknown module: ${moduleName}`);
  }

  const imported = await import(modulePath);
  moduleResult = imported[moduleName](message);
});

Then('the module result should have status {string}', function (status) {
  if (moduleResult.status !== status) {
    throw new Error(`Expected status ${status}, got ${moduleResult.status}`);
  }
});

Then('the module name should be {string}', function (moduleName) {
  if (moduleResult.module !== moduleName) {
    throw new Error(`Expected module ${moduleName}, got ${moduleResult.module}`);
  }
});

When('I run the orchestrator', async function () {
  const { orchestrateTestMessage } = await import('../../../src/orchestrator.js');
  orchestratorResult = orchestrateTestMessage(message);
});

Then('the orchestrator response type should be {string}', function (type) {
  if (orchestratorResult.type !== type) {
    throw new Error(`Expected type ${type}, got ${orchestratorResult.type}`);
  }
});

Then('the orchestrator response should include modules:', function (dataTable) {
  const expectedModules = dataTable.raw().flat();
  const receivedModules = orchestratorResult.results.map((r) => r.module);

  for (const moduleName of expectedModules) {
    if (!receivedModules.includes(moduleName)) {
      throw new Error(`Missing module ${moduleName} in orchestrator response`);
    }
  }
});
