import pino from 'pino';

const logger = pino({
  name: 'humandBrain',
  level: process.env.LOG_LEVEL || 'info',
});

export default logger;
