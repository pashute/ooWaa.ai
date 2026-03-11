Feature: Memgraph KG – Cypher generation (Issue #45)
  As a developer
  I want to build Cypher statements from the mock HOCON
  So that the KG can be stored in Memgraph node by node

  Scenario: Build Cypher statements from HOCON
    Given the mock HOCON is loaded from inAnalyzer.md
    When I build Cypher statements from the HOCON
    Then the Cypher statements should include MERGE operations
    And the Cypher statements should reference Theme nodes
    And the Cypher statements should reference HAS_THEME relationships
