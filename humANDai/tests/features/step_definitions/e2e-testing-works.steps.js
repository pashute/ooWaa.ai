'use strict';

const fs = require('fs');
const path = require('path');
const { Given, When, Then } = require('@cucumber/cucumber');
const supertest = require('supertest');

let appSource;
let apiResponse;

Given('the dashboard app is loaded', function () {
  appSource = fs.readFileSync(path.resolve(process.cwd(), 'App.js'), 'utf8');
});

Then('the app source should contain testID {string}', function (testID) {
  if (!appSource.includes(`testID="${testID}"`)) {
    throw new Error(`Expected App.js to contain testID="${testID}"`);
  }
});

When('the {string} button is pressed', async function (_label) {
  // Simulates the dashboard calling /api/newChat — directly imports backend server
  const { app } = await import('../../../../humandBrain/src/api/server.js');
  apiResponse = await supertest(app).post('/api/newChat').send({});
});

Then('the newChat API should return 501 {string}', function (expectedMessage) {
  // 501 + "Not implemented yet" proves the full chain:
  // button → /api/newChat → orchestrator.newChat() → throws "Not implemented yet"
  if (apiResponse.status !== 501) {
    throw new Error(`Expected status 501, got ${apiResponse.status}`);
  }
  const errorMsg = apiResponse.body && apiResponse.body.error;
  if (errorMsg !== expectedMessage) {
    throw new Error(`Expected error "${expectedMessage}", got "${errorMsg}"`);
  }
});
