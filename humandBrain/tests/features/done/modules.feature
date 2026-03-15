Feature: Backend Modules
  As the backend system
  I want module handlers to process input
  So that the orchestrator can route messages reliably

  Scenario Outline: Module processes a test message
    Given a test message "<payload>"
    When I run module "<module>"
    Then the module result should have status "ok"
    And the module name should be "<module>"

    Examples:
      | module      | payload        |
      | inAnalyzer  | test message   |
      | outAnalyzer | test message   |
      | flowMngr    | test message   |
      | strollAnalyzer | test message |
      | respondMngr | test message   |
      | awareMngr   | test message   |
      | alignMngr   | test message   |
      | knowledgeMngr | test message |
