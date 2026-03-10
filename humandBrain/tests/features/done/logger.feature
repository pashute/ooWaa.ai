Feature: Logger
  As the backend system
  I want a logger instance
  So that I can record operational events

  Scenario: Logger is available
    Given the logger is initialized
    Then the logger should have a level
