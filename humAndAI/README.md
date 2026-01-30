# Frontend Application

React Native mobile application built with Expo.

## Features

- **React Native** - Cross-platform mobile development
- **Expo** - Simplified React Native development and deployment
- **React Navigation** - Ready for screen navigation (when needed)

## Setup

Install dependencies (from root directory):
```bash
npm install
```

## Running the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run as web app
npm run web
```

## Testing on Device

1. Install **Expo Go** on your mobile device:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Start the dev server: `npm start`

3. Scan the QR code:
   - **iOS**: Use Camera app
   - **Android**: Use Expo Go app

## Project Structure

```
frontend/
├── App.js            # Main app component
├── app.json          # Expo configuration
├── babel.config.js   # Babel configuration
├── package.json      # Dependencies
└── assets/           # Images and static files
    └── README.md     # Asset placeholder info
```

## Assets

The `assets/` folder needs the following images:
- `icon.png` (1024x1024) - App icon
- `splash.png` (1284x2778) - Splash screen
- `adaptive-icon.png` (1024x1024) - Android adaptive icon
- `favicon.png` (48x48) - Web favicon

## Next Steps

Build out your app based on requirements:
- Add screens and navigation
- Connect to backend API
- Implement UI components
- Add state management (if needed)
