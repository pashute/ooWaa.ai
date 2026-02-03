import { connect } from 'nats';
import dotenv from 'dotenv';
import logger from './logger.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 4222;
const NATS_SERVER = process.env.NATS_SERVER || 'nats://localhost:4222';

async function startBackend() {
  try {
    logger.info('🚀 Starting BinAI.ai Backend...');

    // Initialize NATS connection
    logger.info({ server: NATS_SERVER }, '📡 Connecting to NATS server');
    const nc = await connect({ servers: NATS_SERVER });
    logger.info('✅ Connected to NATS server');

    // Subscribe to a test subject
    const sub = nc.subscribe('binai.test');
    (async () => {
      for await (const msg of sub) {
        logger.info({ message: msg.string() }, '📨 Received message');
        msg.respond('Message received');
      }
    })();

    logger.info('👂 Listening for messages on "oowaa.test" subject');
    logger.info('   (Configure API keys in .env file)');

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
