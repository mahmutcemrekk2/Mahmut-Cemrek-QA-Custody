Feature: Products API Tests

  Background:
    Given I navigate to the API url
    When I login with username "michaelw" and password "michaelwpass"
    And I have a valid access token

  Scenario: Fetch products with access token
    And I fetch products with a limit of 2
    Then the response status should be 200
    And the response should contain 2 products

  Scenario: Update product
    When I update the first product name to "Updated Product Name"
    Then the update response status should be 200

  Scenario: Delete product
    When I delete the first product
    Then the delete response status should be 200
