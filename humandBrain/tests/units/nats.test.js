import { jest } from '@jest/globals';
import { connect } from 'nats';

jest.setTimeout(10000);

const runNatsTest = process.env.NATS_SERVER ? test : test.skip;

runNatsTest('NATS server is reachable', async () => {
  const server = process.env.NATS_SERVER || 'nats://localhost:4222';
  const nc = await connect({ servers: server, timeout: 3000 });
  await nc.drain();
});
