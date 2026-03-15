Feature: Placeholder UI Display
  As a user
  I want to see the ooWaa.ai placeholder screen
  So that I know the app is running

  Scenario: Display placeholder UI
    Given the app is launched
    Then I should see the title "🤖 ooWaa.ai"
    And I should see the subtitle "The AI reformer"
    And I should see the description "Knows what it doesn't. Teams with you to get it right."
