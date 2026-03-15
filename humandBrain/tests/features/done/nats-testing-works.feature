Feature: NATS testing works
  As a developer
  I want to confirm the NATS test helper sends and receives messages correctly
  So that module communication via NATS is verifiable

  Scenario: NATS test helper sends testSent and receives testReceived
    Given a mock NATS connection
    When I send a NATS test message on subject "oowaa.test.sent"
    Then the NATS response type should be "testReceived"
