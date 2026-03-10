import { jest } from '@jest/globals';
import { StringCodec } from 'nats';
import { sendTestMessage } from '../../src/natsTest.js';

describe('NATS messaging - nats_testing_works', () => {
  it('sendTestMessage sends testSent and returns testReceived (mock)', async () => {
    const sc = StringCodec();
    const nc = {
      request: jest.fn().mockResolvedValue({
        data: sc.encode(JSON.stringify({ type: 'testReceived', payload: 'mock' })),
      }),
    };

    const result = await sendTestMessage({ nc, payload: 'test-roundtrip' });

    expect(result.type).toBe('testReceived');
    expect(nc.request).toHaveBeenCalledWith(
      'oowaa.test.sent',
      expect.any(Uint8Array),
      expect.objectContaining({ timeout: expect.any(Number) })
    );
  });
});

const runNatsTest = process.env.NATS_SERVER ? test : test.skip;

runNatsTest('NATS live roundtrip (requires NATS_SERVER env)', async () => {
  const { connect } = await import('nats');
  const nc = await connect({ servers: process.env.NATS_SERVER, timeout: 3000 });
  const result = await sendTestMessage({ nc, payload: 'live-roundtrip' });
  expect(result.type).toBe('testReceived');
  await nc.drain();
}, 10000);
