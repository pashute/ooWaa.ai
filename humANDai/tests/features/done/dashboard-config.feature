Feature: Dashboard config
  As the dashboard app
  I want to read settings.yaml
  So that defaults are applied

  Scenario: Dashboard kg-view default
    Given the dashboard config is loaded
    Then the dashboard config should include defaults.kg-view
    And the dashboard kg-view should be one of:
      | kg-network |
      | kg-map |
      | kg-lexicon |
    And the dashboard kg-view default should be "kg-network"
