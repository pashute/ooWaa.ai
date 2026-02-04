# Project Configuration Overview

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
├── humANDai/             # React Native (Expo) workspace
├── humandBrain/              # Node.js server workspace
└── package.json          # Root with concurrently scripts
```

## Development Stack and Methodologies
- js code throughout. 
- Developed with gitflow features, stored on github, with GH Project,
- Agile:  BDD/DDD, TDD and E2E testing, CI/CD
- Testing frontend on web (chrome first)
- Future prep for mobile and desktop (android & windows first)
- Frontend web app (react preferred vite, jest etc)
- Backend dynamic serverless, docker, nats. AI and DB tools see details 

## 🔧 Technology Choices

### Frontend (humANDai): 
- **React Native + Expo** (chosen over alternatives)

### Backend (humandBrain):  Node.js
**Core Technologies:**
- **NATS.io** - Lightweight, high-performance messaging
- **LangChain** - Leading LLM application framework
- **LangGraph** - Stateful agent workflows

### Concurrent Execution
- **concurrently** package runs both services simultaneously
- Single command: `npm run dev`
- Both logs visible in same terminal
- Auto-restart on file changes
- Can be tested logged and run individually (see instructions section)

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

All ports auto-forward in Codespaces.

## 📦 Package Management

### NPM Workspaces
```json
{
  "workspaces": ["humANDai", "humandBrain"]
}
```

**Benefits:**
- Shared dependencies hoisted to root
- Single `node_modules` for common packages
- Workspace-specific scripts
- Easier dependency management

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
- Format on save enabled
- Consistent style across team
- No style debates

## 🔐 Environment Variables

### Backend (.env)
```
NATS_SERVER=nats://localhost:4222
OPENAI_API_KEY=your_key_here
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
- **humANDai/README.md** - Frontend functional description
- **humandBrain/README.md** - Backend functional description 
- **DevDocs/TechSetup.md** - (This file) Tech & Dev initial setup requirements

- **DevDocs/** - Feature and devplan for front and back end.
- **DevDocs/frontend/  

## 🔄 Next Steps

1. Inital Test of Front/backend running a placeholder
2. Build React Native UI screens
3. Set up NATS subjects/subscriptions
4. Add state management (Redux, Zustand)
5. Configure CI/CD pipelines
6. Add testing (Jest, React Native Testing Library)
7. Set up analytics
8. Add authentication

## 🛠️ Customization Points

### Easy to Modify
- **Frontend UI**: Edit `humANDai/App.js`
- **Backend Logic**: Edit `humandBrain/src/index.js`
- **NATS Topics**: Add in backend
- **Environment Variables**: Update `.env.example`

### Requires More Work
- Switch from Expo to bare React Native
- Add TypeScript (recommended for scaling)
- Add database (PostgreSQL, MongoDB)
- Add authentication service
- Deploy to production

## 📚 Learning Resources

### React Native
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)

### Backend
- [NATS.io Docs](https://docs.nats.io/)
- [LangChain JS Docs](https://js.langchain.com/)

### Codespaces
- [GitHub Codespaces Docs](https://docs.github.com/en/codespaces)

---

**Configuration Date**: December 8, 2024  
**Configured For**: Windows + VSCode + Codespaces + English  
**Ready For**: Detailed requirements and feature implementation
