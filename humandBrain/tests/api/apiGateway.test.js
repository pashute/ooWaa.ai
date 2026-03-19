import supertest from 'supertest';
import { app } from '../../src/api/server.js';

const request = supertest(app);

describe('API Gateway - api_testing_works', () => {
  it('POST /api/message returns 200 with orchestrated response', async () => {
    const res = await request
      .post('/api/message')
      .send({ message: { type: 'testSent', payload: 'hello' } });

    expect(res.status).toBe(200);
    expect(res.body.type).toBe('testReceived');
  });

  it('POST /api/message response includes all module results', async () => {
    const res = await request
      .post('/api/message')
      .send({ message: { type: 'testSent', payload: 'check modules' } });

    expect(res.body.results).toBeDefined();
    expect(Array.isArray(res.body.results)).toBe(true);
    expect(res.body.results.length).toBeGreaterThan(0);
  });
});
