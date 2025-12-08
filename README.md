# BinAI.ai

The AI reformer. Knows what it doesn't. Teams with you to get it right.

## 🏗️ Project Structure

```
BinAI.ai/
├── frontend/          # React Native mobile application (Expo)
│   ├── App.js        # Main app component
│   ├── app.json      # Expo configuration
│   ├── package.json  # Frontend dependencies
│   └── assets/       # Images and static assets
├── backend/          # Node.js backend service
│   ├── src/
│   │   └── index.js  # Main backend entry point
│   ├── package.json  # Backend dependencies (NATS.io, LangChain, LangGraph)
│   └── .env.example  # Environment variables template
├── .devcontainer/    # VSCode Codespace configuration
│   ├── devcontainer.json
│   └── Dockerfile
└── package.json      # Root package.json with concurrently scripts
```

## 🚀 Tech Stack

### Frontend
- **React Native** - Mobile application framework
- **Expo** - React Native development platform
- **React Navigation** - Navigation library

### Backend
- **Node.js** - JavaScript runtime
- **NATS.io** - Message broker for microservices communication
- **LangChain** - Framework for developing LLM applications
- **LangGraph** - Library for building stateful, multi-actor applications

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- (Optional) NATS server for local development
- (Optional) Expo Go app on your mobile device

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/pashute/BinAI.ai.git
cd BinAI.ai
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for the root, frontend, and backend workspaces.

### 3. Configure Environment Variables

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your API keys:
- `OPENAI_API_KEY` - For LangChain/OpenAI integration
- `NATS_SERVER` - NATS server URL (default: nats://localhost:4222)

### 4. Run the Application

From the root directory:

```bash
npm run dev
```

This will start both the backend and frontend concurrently:
- **Backend**: Runs on port 4222 (NATS) / 3000 (default)
- **Frontend**: Expo dev server (Metro bundler)

### Individual Commands

```bash
# Start only backend
npm run dev:backend

# Start only frontend
npm run dev:frontend

# Clean all dependencies and build artifacts
npm run clean
```

## 🌐 Development with GitHub Codespaces

This project is configured for GitHub Codespaces with VSCode:

1. Open the repository in GitHub Codespaces
2. The devcontainer will automatically set up the environment
3. English locale and Windows-compatible terminal settings are pre-configured
4. GitHub Copilot extensions are included

### Port Forwarding

The following ports are automatically forwarded:
- `8081` - Expo Metro bundler
- `3000` - Backend API (if used)
- `4222` - NATS server

## 📱 Running on Mobile Device

1. Install **Expo Go** app on your device
2. Start the dev server: `npm run dev`
3. Scan the QR code shown in terminal with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

## 🔧 Configuration Files

### Codespace/VSCode Settings
- `.devcontainer/devcontainer.json` - Codespace configuration
- `.devcontainer/Dockerfile` - Container definition
- English locale and Windows terminal preferences included

### Frontend Configuration
- `frontend/app.json` - Expo app configuration
- `frontend/babel.config.js` - Babel transpiler configuration

### Backend Configuration
- `backend/.env` - Environment variables (create from .env.example)

## 📦 NPM Scripts

### Root Level
- `npm run dev` - Run both frontend and backend concurrently
- `npm run dev:backend` - Run only backend
- `npm run dev:frontend` - Run only frontend
- `npm run install:all` - Install all dependencies
- `npm run clean` - Clean all workspaces

### Backend
- `npm run dev --workspace=backend` - Run backend with hot reload
- `npm run start --workspace=backend` - Run backend in production mode

### Frontend
- `npm run start --workspace=frontend` - Start Expo dev server
- `npm run android --workspace=frontend` - Run on Android emulator
- `npm run ios --workspace=frontend` - Run on iOS simulator
- `npm run web --workspace=frontend` - Run as web app

## 🔐 Environment Variables

See `backend/.env.example` for all available environment variables.

Required for full functionality:
- `OPENAI_API_KEY` - OpenAI API key for LangChain
- `NATS_SERVER` - NATS messaging server URL

## 🤝 Contributing

Details will be provided after initial requirements gathering.

## 📄 License

Details will be provided.

## 🗺️ Roadmap

More features and requirements will be added as the project evolves.

---

**Note**: This is an initial setup. Detailed requirements and features will be implemented in subsequent iterations. 
