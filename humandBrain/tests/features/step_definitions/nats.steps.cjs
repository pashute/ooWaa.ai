'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { StringCodec } = require('nats');

let nc;
let result;

Given('a mock NATS connection', function () {
  const sc = StringCodec();
  nc = {
    request: async (_subject, _data, _opts) => ({
      data: sc.encode(JSON.stringify({ type: 'testReceived', payload: 'mock' })),
    }),
  };
});

When('I send a NATS test message on subject {string}', async function (subject) {
  const { sendTestMessage } = await import('../../../src/natsTest.js');
  result = await sendTestMessage({ nc, payload: 'cucumber-nats-test', subject });
});

Then('the NATS response type should be {string}', function (type) {
  if (result.type !== type) {
    throw new Error(`Expected NATS response type "${type}", got "${result.type}"`);
  }
});
