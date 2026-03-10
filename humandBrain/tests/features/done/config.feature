Feature: Config loading
  As the backend system
  I want to read YAML config files
  So that defaults can be applied at startup

  Scenario: Brain config defaults load
    Given the brain config is loaded
    Then the brain config default MLL should be "mixtral"
    And the brain config default embedding model should be "nomic-embed-text"

