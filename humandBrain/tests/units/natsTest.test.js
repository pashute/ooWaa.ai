import { jest } from '@jest/globals';
import { StringCodec } from 'nats';
import { sendTestMessage } from '../../src/natsTest.js';

describe('sendTestMessage', () => {
  it('sends testSent and returns testReceived without UI', async () => {
    const sc = StringCodec();
    const nc = {
      request: jest.fn().mockResolvedValue({
        data: sc.encode(JSON.stringify({ type: 'testReceived' })),
      }),
    };

    const result = await sendTestMessage({ nc, payload: 'msg1' });
    expect(result.type).toBe('testReceived');
    expect(nc.request).toHaveBeenCalled();
  });
});
