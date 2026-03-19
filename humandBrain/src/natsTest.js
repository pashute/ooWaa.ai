import { StringCodec } from 'nats';

const DEFAULT_SUBJECT = 'oowaa.test.sent';

export async function sendTestMessage({ nc, payload, subject = DEFAULT_SUBJECT, timeout = 2000 }) {
  const sc = StringCodec();
  const requestPayload = {
    type: 'testSent',
    payload,
    timestamp: Date.now(),
  };

  const response = await nc.request(
    subject,
    sc.encode(JSON.stringify(requestPayload)),
    { timeout }
  );

  const decoded = sc.decode(response.data);
  return JSON.parse(decoded);
}
