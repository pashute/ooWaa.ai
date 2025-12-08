# Backend Service

Node.js backend service with NATS.io messaging and LangChain/LangGraph AI capabilities.

## Features

- **NATS.io** - High-performance messaging system for microservices
- **LangChain** - Framework for building AI applications with LLMs
- **LangGraph** - Stateful, multi-actor application support

## Setup

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

2. Configure your API keys in `.env`:
   - `OPENAI_API_KEY` - Required for OpenAI integration
   - `NATS_SERVER` - NATS server URL (default: nats://localhost:4222)

3. Install dependencies:
   ```bash
   npm install
   ```

## Running

```bash
# Development mode with hot reload
npm run dev

# Production mode
npm start
```

## Project Structure

```
backend/
├── src/
│   └── index.js      # Main entry point
├── .env.example      # Environment variables template
└── package.json      # Dependencies
```

## NATS.io Integration

The backend connects to a NATS server for message-based communication. By default, it:
- Connects to `nats://localhost:4222`
- Subscribes to `binai.test` subject
- Handles graceful shutdown

## LangChain/LangGraph

LangChain and LangGraph are ready to use for:
- Building conversational AI
- Creating agentic workflows
- Managing stateful interactions
- Integrating multiple AI models

## Next Steps

Configure the AI operations based on your specific requirements:
- Set up LangChain chains
- Define LangGraph workflows
- Create NATS subjects for your use cases
