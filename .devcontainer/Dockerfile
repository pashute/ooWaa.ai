FROM mcr.microsoft.com/devcontainers/javascript-node:18

# Ensure vscode user exists with proper setup
RUN if ! id -u vscode > /dev/null 2>&1; then \
    if ! getent group 1000 > /dev/null 2>&1; then \
      groupadd --gid 1000 vscode; \
    fi && \
    useradd --uid 1000 --gid 1000 -m -s /bin/bash vscode 2>/dev/null || true && \
    apt-get update && \
    apt-get install -y sudo && \
    echo vscode ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/vscode && \
    chmod 0440 /etc/sudoers.d/vscode; \
    fi

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
