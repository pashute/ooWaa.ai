FROM mcr.microsoft.com/devcontainers/javascript-node:18

# Install additional dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    watchman \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

# Set locale to English
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US:en
ENV LC_ALL=en_US.UTF-8

# Install Expo CLI globally for React Native development
RUN npm install -g expo-cli @react-native-community/cli

# Set the default shell to bash
SHELL ["/bin/bash", "-c"]
