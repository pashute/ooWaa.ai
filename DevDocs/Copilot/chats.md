
# ooWaa.ai Tech Summary (Current Repo State)

## Frontend: humANDai (React Native + Expo)

### Technology Setup
- React Native 0.73.x with Expo SDK 50
- React 18
- Navigation: `@react-navigation/native` + `@react-navigation/native-stack`
- Core Expo packages: `expo`, `expo-status-bar`

### Dev Tools Setup
- Babel: `@babel/core`
- Lint/format: (not defined in package.json)
- Clean script: `npm run clean` (removes `node_modules` and `.expo`)

### Testing Setup
- Unit/Component tests: Jest + `jest-expo`
- React Native testing: `@testing-library/react-native`
- E2E tests: Playwright (`@playwright/test`)

### Run in Dev Mode
- `npm run start --workspace=humANDai`
	- or from root: `npm run dev` (runs frontend + backend)

### Run in Release Mode (if applicable)
- Expo production builds are handled via Expo tooling (not scripted here).
- No explicit `build` or `release` scripts defined in package.json.

---

## Backend: humandBrain (Node.js + NATS + LangChain/LangGraph)

### Technology Setup
- Node.js (ESM) with `type: module`
- Messaging: `nats`
- LLM tooling: `langchain`, `@langchain/langgraph`, `@langchain/core`, `@langchain/openai`
- Logging: `pino`
- Env config: `dotenv`

### Dev Tools Setup
- Node watch mode: `node --watch src/index.js`
- Clean script: `npm run clean` (removes `dist` and `node_modules`)

### Testing Setup
- Unit tests: Jest (`@jest/globals`, `jest`)
- BDD tests: Cucumber (`@cucumber/cucumber`)

### Run in Dev Mode
- `npm run dev --workspace=humandBrain`
	- or from root: `npm run dev` (runs frontend + backend)

### Run in Release Mode
- `npm run start --workspace=humandBrain`


