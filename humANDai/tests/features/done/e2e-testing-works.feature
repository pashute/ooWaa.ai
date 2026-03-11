Feature: E2E testing works
  As a developer
  I want to confirm the dashboard New Chat button calls the newChat API
  So that the full frontend-to-backend path is verified during development

  Scenario: Dashboard displays the New Chat button
    Given the dashboard app is loaded
    Then the app source should contain testID "new-chat-button"

  Scenario: New Chat button triggers the backend newChat endpoint
    Given the dashboard app is loaded
    When the "New Chat" button is pressed
    Then the newChat API should return 501 "Not implemented yet"
    # This proves the full e2e chain is wired: button → /api/newChat → orchestrator.newChat()
