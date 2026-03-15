'use strict';
// Brain API client — calls the humandBrain HTTP gateway.
// Default URL: http://localhost:3000 (port set in humandBrain src/index.js and TechSetup.md).
// Override with the BRAIN_API_URL environment variable.
//
// Usage:
//   const { sendMessage, newChat } = require('./src/api/brainApi');
//   const result = await sendMessage({ type: 'testSent', payload: 'hello' });
//   // result: { type: 'testReceived', original: {...}, results: [...] }

const BRAIN_API_URL =
  (typeof process !== 'undefined' && process.env && process.env.BRAIN_API_URL) ||
  'http://localhost:3000';

/**
 * Send a message to the brain orchestrator.
 * Calls POST /api/message on the humandBrain HTTP gateway.
 * @param {object} message - e.g. { type: 'testSent', payload: 'hello' }
 * @returns {Promise<{type: string, original: object, results: object[]}>}
 */
async function sendMessage(message) {
  const res = await fetch(`${BRAIN_API_URL}/api/message`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  return res.json();
}

/**
 * Request a new chat session from the brain orchestrator.
 * Calls POST /api/newChat on the humandBrain HTTP gateway.
 * Currently returns 501 "Not implemented yet" — placeholder until dashboard features are defined.
 * @returns {Promise<object>}
 */
async function newChat() {
  const res = await fetch(`${BRAIN_API_URL}/api/newChat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  return res.json();
}

module.exports = { sendMessage, newChat, BRAIN_API_URL };
