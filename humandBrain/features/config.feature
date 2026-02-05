Feature: Config loading
  As the backend system
  I want to read YAML config files
  So that defaults can be applied at startup

  Scenario: Brain config defaults load
    Given the brain config is loaded
    Then the brain config default MLL should be "mixtral"
    And the brain config default embedding model should be "nomic-embed-text"

  Scenario: Dashboard config defaults load
    Given the dashboard config is loaded
    Then the dashboard config default kg view should be "kg-nodes"
    And the dashboard config should enable "kg-map"
    And the dashboard config should enable "kg-lexicon"
