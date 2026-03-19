Feature: Orchestrator Flow
  As the backend orchestrator
  I want to route a test message through all modules
  So that I can confirm the analysis pipeline

  Scenario: Orchestrator routes test message
    Given a test message "testSent"
    When I run the orchestrator
    Then the orchestrator response type should be "testReceived"
    And the orchestrator response should include modules:
      | inAnalyzer  |
      | outAnalyzer |
      | flowMngr    |
      | strollAnalyzer |
      | respondMngr |
      | awareMngr   |
      | alignMngr   |
      | knowledgeMngr |
