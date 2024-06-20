Feature: Login API Tests

  Background:
    Given I navigate to the API url

  Scenario Outline: Successful login
    When I login with username "<username>" and password "<password>"
    Then the response status should be <status>
    And the response should contain a "<response>"

    Examples:
      | username | password     | status | response     |
      | michaelw | michaelwpass |    200 | accessToken  |
      | michaelw | michaelw     |    400 | errorMessage |
