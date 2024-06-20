Feature: Paribu Web Automation

  Scenario: Check total price calculation
    Given I navigate to the Paribu homepage
    When I close the cookie notification
    And I navigate to the Markets page
    And I select the FAN filter
    And I set the price change time range to 12 hours
    And I click on the 3rd cryptocurrency in the list
    And I enter the current price in the Unit Price field
    And I enter 5 in the Amount field
    Then the total price should be correctly calculated