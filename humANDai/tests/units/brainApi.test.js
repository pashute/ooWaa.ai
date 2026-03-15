'use strict';
const { sendMessage, newChat, BRAIN_API_URL } = require('../../src/api/brainApi');

describe('brainApi', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('sendMessage', () => {
    it('POSTs to /api/message with the message payload', async () => {
      const fakeResponse = { type: 'testReceived', original: {}, results: [] };
      global.fetch.mockResolvedValueOnce({ json: async () => fakeResponse });

      const msg = { type: 'testSent', payload: 'hello' };
      const result = await sendMessage(msg);

      expect(global.fetch).toHaveBeenCalledWith(
        `${BRAIN_API_URL}/api/message`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msg }),
        }),
      );
      expect(result).toEqual(fakeResponse);
    });

    it('returns the orchestrator response with type testReceived', async () => {
      const fakeResponse = {
        type: 'testReceived',
        original: { type: 'testSent', payload: 'hi' },
        results: [{ module: 'inAnalyzer', status: 'ok' }],
      };
      global.fetch.mockResolvedValueOnce({ json: async () => fakeResponse });

      const result = await sendMessage({ type: 'testSent', payload: 'hi' });
      expect(result.type).toBe('testReceived');
      expect(Array.isArray(result.results)).toBe(true);
    });
  });

  describe('newChat', () => {
    it('POSTs to /api/newChat', async () => {
      const fakeResponse = { error: 'Not implemented yet' };
      global.fetch.mockResolvedValueOnce({ json: async () => fakeResponse });

      await newChat();

      expect(global.fetch).toHaveBeenCalledWith(
        `${BRAIN_API_URL}/api/newChat`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    });

    it('returns the backend response JSON', async () => {
      const fakeResponse = { error: 'Not implemented yet' };
      global.fetch.mockResolvedValueOnce({ json: async () => fakeResponse });

      const result = await newChat();
      expect(result).toEqual(fakeResponse);
    });
  });

  describe('BRAIN_API_URL', () => {
    it('defaults to http://localhost:3000', () => {
      expect(BRAIN_API_URL).toBe('http://localhost:3000');
    });
  });
});
