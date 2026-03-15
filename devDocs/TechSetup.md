# Project Configuration Overview

**Version:** 1.2.0  
**Last Updated:** March 15, 2026

## Environment: GitHub Codespaces + VSCode (Windows-Compatible)

This document outlines all the configuration decisions made for the ooWaa.ai project.

## 📁 Project Structure

### Monorepo with Workspaces
- Uses npm workspaces for managing frontend and backend
- Single `npm install` at root installs all dependencies
- Shared development tools and configurations

### Directory Layout
```
ooWaa.ai/
├── .devcontainer/        # Codespace configuration
├── .vscode/              # VSCode settings
├── devDocs/              # Project documentation
├── humANDai/             # React Native (Expo) workspace
│   ├── App.js            # main (expo)
│   ├── app.json          # data (expo)
│   ├── babel.config.js   # config (babel)
│   ├── assets/           # proj assets (expo req)
│   ├── src/              # app source code
│   └── tests/            # all tests
│       ├── units/        # Jest unit tests
│       ├── e2e/          # Playwright end-to-end tests
│       ├── mocks/        # shared test mocks
│       ├── pending/      # unfinished/deferred tests
│       └── features/     # Cucumber BDD
│           └── done/     # implemented features
├── humandBrain/          # Node.js server workspace
│   ├── src/              # backend source code
│   └── tests/            # all tests
│       ├── units/        # Jest unit tests
│       ├── api/          # HTTP API integration tests (Supertest)
│       ├── messages/     # NATS messaging tests
│       ├── mocks/        # shared test mocks
│       ├── pending/      # unfinished/deferred tests
│       └── features/     # Cucumber BDD
│           └── done/     # implemented features
└── package.json          # Root with concurrently scripts
```

See [devDocs/](devDocs/) for full project documentation.

## Development Stack and Methodologies
- js code throughout. 
- Developed with gitflow features, stored on github, with GH Project,
- Agile:  BDD/DDD, TDD and E2E testing, CI/CD
- Testing frontend on web (chrome first)
- Future prep for mobile and desktop (android & windows first)
- Frontend web app (react preferred vite, jest etc)
- Backend dynamic serverless, docker, nats. AI and DB tools see details 

## 🔧 Technology Choices

### Frontend (humANDai dashboard app): 
- **React Native + Expo** (chosen over alternatives)
- **Config files (YAML)** - [humANDai/src/config/settings.yaml](humANDai/src/config/settings.yaml)
- **Dashboard defaults** - `defaults.kg-view: kg-nodes` (kg-map, kg-lexicon)

### Backend (humandBrain):  Node.js
**Core Technologies:**
- **NATS.io** - Lightweight, high-performance messaging
- **LangChain** - Leading LLM application framework
- **LangGraph** - Stateful agent workflows
- **Memgraph** - Real-time graph store for embeddings/KG construction
- **Supabase** - Persistent data layer
- **Pino** - Logging (structured JSON logger)
- **HOCON Parser** - hocon-parser for analysis reports and kg node representation

- **Ollama** - Replaceable Local LLM and embedding engine  set in config
- **Config files (YAML)** - [humandBrain/src/config/settings.yaml](humandBrain/src/config/settings.yaml)

### Knowledge base main model and embedding engine
- **Configured in** [humandBrain/src/config/settings.yaml](humandBrain/src/config/settings.yaml) (MLL + embedding_model)
- **See remarks** in [humandBrain/src/config/settings.yaml](humandBrain/src/config/settings.yaml) for other options

**Backend Setup Notes:**
- Environment variables template: [devDocs/Backend/.env.example](devDocs/Backend/.env.example) — copy to `humandBrain/.env` and fill in API keys.
- NATS default: `nats://localhost:4222` (see .env).
- Default test subject: `oowaa.test` (update as needed).
- **HTTP API Gateway** (`src/api/server.js`): thin Express server exposing `POST /api/message` → orchestrator → NATS modules. Start port: 3000.
- **API Testing** (`tests/api/`): Supertest integration tests against the Express gateway.
- **NATS Messaging Tests** (`tests/messages/`): Jest tests for NATS roundtrip via mock and (optionally) live server.

### Concurrent Execution
- **concurrently** package runs both services simultaneously
- Single command: `npm run dev`
- Both logs visible in same terminal
- Auto-restart on file changes
- Can be tested logged and run individually (see instructions section)

## 🔗 Frontend → Backend Communication

The dashboard frontend (`humANDai`) calls the brain orchestrator through the humandBrain **HTTP API gateway** (Express, port 3000).

### API Client Module

`humANDai/src/api/brainApi.js` provides two functions:

```js
const { sendMessage, newChat } = require('./src/api/brainApi');

// Send a message through the full orchestrator pipeline:
const result = await sendMessage({ type: 'testSent', payload: 'hello' });
// result: { type: 'testReceived', original: {...}, results: [...] }

// Request a new chat session (placeholder — returns 501 until implemented):
const res = await newChat();
```

### Endpoints

| Method | Path | Handler | Description |
|--------|------|---------|-------------|
| `POST` | `/api/message` | `orchestrateTestMessage(msg)` | Fans message out through all brain modules; returns `testReceived` with all results |
| `POST` | `/api/newChat` | `newChat()` | Starts a new chat session. Currently throws `501 "Not implemented yet"` (placeholder) |

### How It Works

```
humANDai (button onPress)
  └─► brainApi.newChat() / brainApi.sendMessage()
        └─► POST http://localhost:3000/api/newChat  (or /api/message)
              └─► humandBrain/src/api/server.js  (Express gateway)
                    └─► orchestrator.newChat() / orchestrateTestMessage()
                          └─► all brain modules (inAnalyzer, outAnalyzer, flowMngr, …)
```

### Configuration

- Backend port: `3000` (default). Set `API_PORT` env var in `humandBrain/.env` to change.
- Frontend URL: `http://localhost:3000` (default). Set `BRAIN_API_URL` env var to override.

### Tests

- **Unit** (`humANDai/tests/units/brainApi.test.js`): mocks `fetch`; verifies correct URL, method, headers, and response handling for `sendMessage` and `newChat`.
- **BDD / e2e** (`humANDai/tests/features/done/e2e-testing-works.feature`): verifies end-to-end chain — dashboard "New Chat" button → `/api/newChat` → `orchestrator.newChat()` → `501 "Not implemented yet"`.
- **API integration** (`humandBrain/tests/api/apiGateway.test.js`): Supertest hits `POST /api/message`, verifies `200` + `testReceived` response.

## 🐳 Codespace Configuration
### Devcontainer Features
- **Base Image**: Microsoft's JavaScript-Node devcontainer
- **Node Version**: 18 (LTS)
- **Included Tools**:
  - Git
  - GitHub CLI
  - Watchman (for React Native)
  - Expo CLI
  - React Native CLI

### VSCode Extensions (Auto-installed)
1. **ESLint** - Code linting
2. **Prettier** - Code formatting
3. **TypeScript** - TypeScript support
4. **GitHub Copilot** - AI pair programmer
5. **GitHub Copilot Chat** - AI assistance
6. **React Native Tools** - RN debugging
7. **Auto Rename Tag** - HTML/JSX editing
8. **Path Intellisense** - File path autocomplete

### Windows Compatibility
- Default terminal: Command Prompt (not bash)
- Line endings: CRLF (`\r\n`)
- Alternative: PowerShell available
- File paths use forward slashes (cross-platform)

### English Locale
- System locale: `en_US.UTF-8`
- VSCode locale: English
- All UI and documentation in English
- Copilot interface: English

## 🔌 Port Configuration

| Port | Service | Description |
|------|---------|-------------|
| 8081 | Expo Metro | React Native bundler |
| 3000 | Backend API | HTTP server (optional) |
| 4222 | NATS | Message broker |
| 7687 | Memgraph | Bolt protocol |

All ports auto-forward in Codespaces.

## 📦 Package Management

### NPM Workspaces
```json
{
  "workspaces": ["humANDai", "humandBrain"]
}
```

### Dependency Strategy
- **Root**: Development tools (`concurrently`)
- **Frontend**: React Native, Expo, navigation
- **Backend**: NATS, LangChain, LangGraph

## 🎨 Code Style

### Prettier Configuration
- Single quotes
- Semicolons
- 2-space indentation
- 80 character line width
- ES5 trailing commas

### Auto-formatting
- Format on save enabled (consistent)
- Consistent 

## 🔐 Environment Variables

### Backend (.env)
```
NATS_SERVER=nats://localhost:4222
OPENAI_API_KEY=your_key_here
MEMGRAPH_URI=bolt://localhost:7687
MEMGRAPH_USER=memgraph
MEMGRAPH_PASSWORD=memgraph
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
```

### Security
- `.env` files in `.gitignore`
- `.env.example` for templates
- Never commit secrets

## 🚀 Development Workflow

### Getting Started
1. Open in Codespace
2. Wait for automatic setup
3. Run `npm install`
4. Copy `.env.example` to `.env`
5. Run `npm run dev`

### Daily Development
```bash
npm run dev          # Start everything
# Make changes
# Services auto-reload
```

### Testing on Devices
1. Install Expo Go app
2. Scan QR code
3. Test on real device
4. Hot reload works

## 📝 Documentation Structure

- **README.md** - Main documentation
- **humANDai/README.md** - Frontend general description
- **humandBrain/README.md** - Backend general description 
- **devDocs/TechSetup.md** - (This file) Tech & Dev initial setup requirements

- **devDocs/** - Feature and devplan for front and back end.
- **devDocs/Frontend/ 
- **devDocs/Backend/ 

## 🛠️ Customization Points

### Easy to Modify
- **Frontend UI**: Edit `humANDai/App.js`
- **Backend Logic**: Edit `humandBrain/src/index.js`
- **NATS Topics**: Add in backend
- **Environment Variables**: Update `.env.example`

### Future steps
- Add TypeScript (recommended for scaling)
- Add authentication service
