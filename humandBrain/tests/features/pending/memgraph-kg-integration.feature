Feature: Memgraph KG integration – live service (Issue #45)
  As a developer
  I want to store the mock HOCON KG in Memgraph node by node
  So that I can verify KG persistence and round-trip JSON retrieval
  (Requires MEMGRAPH_URI env variable and a running Memgraph instance)

  @requires-memgraph
  Scenario: Insert KG nodes into Memgraph one by one
    Given the mock HOCON is loaded from inAnalyzer.md
    And Memgraph is available
    When the KG is stored in Memgraph node by node
    Then Memgraph contains the Theme nodes
    And Memgraph contains the PromptItem nodes

  @requires-memgraph
  Scenario: Retrieved KG JSON matches HOCON structure
    Given the mock HOCON KG has been stored in Memgraph
    When I retrieve the KG as JSON from Memgraph
    Then the themes in the JSON match the HOCON themes
    And the prompt items in the JSON match the HOCON prompt items

  @requires-memgraph
  Scenario: KG relationships are stored correctly
    Given the mock HOCON KG has been stored in Memgraph
    When I retrieve the KG as JSON from Memgraph
    Then the JSON includes HAS_THEME relationships
    And the JSON includes HAS_ITEM relationships
