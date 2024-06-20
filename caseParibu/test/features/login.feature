Feature: Login functionality
  Scenario: User attempts to login with invalid credentials
     Given I navigate to the Paribu homepage
    When I close the cookie notification
    And I click on the login button
    And I fill in the login form with invalid credentials
    And I submit the login form
    Then I should see an error message indicating invalid credentials