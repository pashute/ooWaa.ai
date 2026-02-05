import { jest } from '@jest/globals';
import { connect } from 'nats';

jest.setTimeout(10000);

const shouldRun = process.env.NATS_TEST === '1';
const runTest = shouldRun ? test : test.skip;

runTest('NATS server is reachable', async () => {
  const server = process.env.NATS_SERVER || 'nats://localhost:4222';
  const nc = await connect({ servers: server, timeout: 3000 });
  await nc.drain();
});
