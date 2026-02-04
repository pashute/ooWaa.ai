import { connect, StringCodec } from 'nats';
import http from 'http';
import dotenv from 'dotenv';
import logger from './logger.js';
import { orchestrateTestMessage } from './orchestrator.js';
import { sendTestMessage } from './natsTest.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 4222;
const API_PORT = process.env.API_PORT || 3000;
const NATS_SERVER = process.env.NATS_SERVER || 'nats://localhost:4222';

async function startBackend() {
  try {
    logger.info('🚀 Starting BinAI.ai Backend...');

    // Initialize NATS connection
    logger.info({ server: NATS_SERVER }, '📡 Connecting to NATS server');
    const nc = await connect({ servers: NATS_SERVER });
    logger.info('✅ Connected to NATS server');

    // Subscribe to a test subject
    const sc = StringCodec();
    const sub = nc.subscribe('oowaa.test.sent');
    (async () => {
      for await (const msg of sub) {
        const decoded = sc.decode(msg.data);
        const payload = (() => {
          try {
            return JSON.parse(decoded);
          } catch (error) {
            return { type: 'testSent', payload: decoded };
          }
        })();

        logger.info({ message: payload }, '📨 Received test message');
        const response = orchestrateTestMessage(payload);
        msg.respond(sc.encode(JSON.stringify(response)));
      }
    })();

    logger.info('👂 Listening for messages on "oowaa.test.sent" subject');
    logger.info('   (Configure API keys in .env file)');

    const server = http.createServer(async (req, res) => {
      if (req.method === 'POST' && req.url === '/test-message') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', async () => {
          try {
            const parsed = body ? JSON.parse(body) : {};
            const payload = parsed.payload || 'test message';
            const response = await sendTestMessage({ nc, payload });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(response));
          } catch (error) {
            logger.error({ err: error }, '❌ Error handling /test-message');
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'test-message-failed' }));
          }
        });
        return;
      }

      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'not-found' }));
    });

    server.listen(API_PORT, () => {
      logger.info(`🌐 HTTP server listening on :${API_PORT}`);
    });

    // Keep the process running
    process.on('SIGINT', async () => {
      logger.info('\n🛑 Shutting down gracefully...');
      await nc.drain();
      process.exit(0);
    });

    logger.info('\n✨ Backend server is running!');
    logger.info('   NATS: Ready for messaging');
    logger.info('   LangChain: Ready for AI operations');

  } catch (error) {
    logger.error({ err: error }, '❌ Error starting backend');
    process.exit(1);
  }
}

startBackend();
