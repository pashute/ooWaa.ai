Feature: HOCON mock KG
  As a developer
  I want to parse HOCON into a mock KG
  So that I can test Neo4j/Cypher generation

  Scenario: Build mock Cypher from HOCON
    Given the mock HOCON fixture is loaded
    When I build Cypher from the mock HOCON
    Then the Cypher should include Theme nodes
    And the Cypher should include HAS_THEME relationships
