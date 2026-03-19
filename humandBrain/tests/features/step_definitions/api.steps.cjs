'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const supertest = require('supertest');

let request;
let response;

Given('the API server is running', async function () {
  const { app } = await import('../../../src/api/server.js');
  request = supertest(app);
});

When('I POST a message to {string}', async function (path) {
  response = await request
    .post(path)
    .send({ message: { type: 'testSent', payload: 'cucumber-test' } });
});

Then('the response status should be {int}', function (status) {
  if (response.status !== status) {
    throw new Error(`Expected status ${status}, got ${response.status}`);
  }
});

Then('the response type should be {string}', function (type) {
  if (response.body.type !== type) {
    throw new Error(`Expected type "${type}", got "${response.body.type}"`);
  }
});

Then('the response results array should not be empty', function () {
  const results = response.body.results;
  if (!Array.isArray(results) || results.length === 0) {
    throw new Error(`Expected non-empty results array, got: ${JSON.stringify(results)}`);
  }
});
