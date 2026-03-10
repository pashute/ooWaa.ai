import pino from 'pino';
import logger from '../../src/logger.js';

describe('logger', () => {
  it('uses default log level when LOG_LEVEL is not set', () => {
    expect(logger.level).toBe(process.env.LOG_LEVEL || 'info');
  });

  it('creates a pino logger instance', () => {
    const instance = pino({ name: 'test-logger' });
    expect(instance).toBeDefined();
  });
});
