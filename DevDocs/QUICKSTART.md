# 🚀 Quick Start Guide

## For GitHub Codespaces (Recommended)

1. **Open in Codespace**
   - Click the green "Code" button on GitHub
   - Select "Codespaces" tab
   - Click "Create codespace on main"
   - Wait for the environment to build (first time takes a few minutes)

2. **Automatic Setup**
   - The devcontainer will automatically install Node.js 18
   - All VSCode extensions will be installed
   - Environment is configured for English locale and Windows compatibility

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Configure Backend**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env and add your API keys (optional for testing)
   cd ..
   ```

5. **Run the Application**
   ```bash
   npm run dev
   ```
   
   This starts both:
   - Backend server (NATS.io ready on port 4222)
   - Frontend (Expo Metro bundler on port 8081)

6. **Access Frontend**
   - For web: Open the forwarded port 8081 in your browser
   - For mobile: Install Expo Go app and scan the QR code

## For Local Development (Windows)

### Prerequisites
- Windows 10/11
- Node.js 18+ ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/download/win))
- VSCode ([Download](https://code.visualstudio.com/))

### Steps

1. **Clone Repository**
   ```cmd
   git clone https://github.com/pashute/BinAI.ai.git
   cd BinAI.ai
   ```

2. **Install Dependencies**
   ```cmd
   npm install
   ```

3. **Configure Backend**
   ```cmd
   cd backend
   copy .env.example .env
   notepad .env
   :: Add your API keys, then save and close
   cd ..
   ```

4. **Run Application**
   ```cmd
   npm run dev
   ```

5. **Open in Browser**
   - Backend will log its status in the terminal
   - Expo will show a QR code for mobile testing
   - Press 'w' in the Expo terminal to open web version

## Troubleshooting

### Port Already in Use
If you see "port already in use" errors:
```bash
# Find and kill processes on specific ports (Windows)
netstat -ano | findstr :4222
taskkill /PID <process_id> /F

netstat -ano | findstr :8081
taskkill /PID <process_id> /F
```

### NATS Connection Error
If backend can't connect to NATS:
- The backend will log errors but continue running
- For production, install NATS server: https://nats.io/download/
- For development, the backend works without a local NATS server

### Expo Not Starting
```bash
cd frontend
npm install
npx expo start
```

### Dependencies Issues
```bash
# Clean and reinstall
npm run clean
npm install
```

## Next Steps

1. **Configure AI Services**: Add your OpenAI API key to `backend/.env`
2. **Add Features**: Implement your specific requirements
3. **Customize Frontend**: Modify `frontend/App.js` for your UI
4. **Expand Backend**: Add LangChain/LangGraph logic in `backend/src/`

## Useful Commands

```bash
# Run only backend
npm run dev:backend

# Run only frontend
npm run dev:frontend

# Clean all dependencies
npm run clean

# Frontend specific
cd frontend
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run in browser

# Backend specific
cd backend
npm run dev        # Dev with hot reload
npm start          # Production mode
```

## Getting Help

- Check the main [README.md](README.md) for detailed documentation
- Frontend docs: [frontend/README.md](frontend/README.md)
- Backend docs: [backend/README.md](backend/README.md)
- Create an issue on GitHub for bugs or questions

---

**Ready to build!** 🎉
