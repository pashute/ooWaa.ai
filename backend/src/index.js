import { connect } from 'nats';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 4222;
const NATS_SERVER = process.env.NATS_SERVER || 'nats://localhost:4222';

async function startBackend() {
  try {
    console.log('🚀 Starting BinAI.ai Backend...');
    
    // Initialize NATS connection
    console.log(`📡 Connecting to NATS server at ${NATS_SERVER}...`);
    const nc = await connect({ servers: NATS_SERVER });
    console.log('✅ Connected to NATS server');
    
    // Subscribe to a test subject
    const sub = nc.subscribe('binai.test');
    (async () => {
      for await (const msg of sub) {
        console.log(`📨 Received message: ${msg.string()}`);
        msg.respond('Message received');
      }
    })();
    
    console.log('👂 Listening for messages on "binai.test" subject');
    
    // LangChain/LangGraph initialization placeholder
    console.log('🔗 LangChain/LangGraph initialization ready');
    console.log('   (Configure API keys in .env file)');
    
    // Keep the process running
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down gracefully...');
      await nc.drain();
      process.exit(0);
    });
    
    console.log('\n✨ Backend server is running!');
    console.log('   NATS: Ready for messaging');
    console.log('   LangChain: Ready for AI operations');
    
  } catch (error) {
    console.error('❌ Error starting backend:', error);
    process.exit(1);
  }
}

startBackend();
