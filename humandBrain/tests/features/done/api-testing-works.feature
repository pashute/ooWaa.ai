Feature: API testing works
  As a developer
  I want to confirm the HTTP API gateway processes messages end-to-end
  So that the frontend can reliably communicate with the backend orchestrator

  Scenario: API gateway responds to a message
    Given the API server is running
    When I POST a message to "/api/message"
    Then the response status should be 200
    And the response type should be "testReceived"

  Scenario: API gateway response includes module results
    Given the API server is running
    When I POST a message to "/api/message"
    Then the response results array should not be empty
