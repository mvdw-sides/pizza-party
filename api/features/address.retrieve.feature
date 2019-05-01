Feature: Retrieve addresses
  In order to test the flow
  As a developer
  I want to do this piece of magix

 Scenario: Getting user information for an user
    Given the client provides the header "Content-Type: application/json"
    When the client does a GET request to "/addresses"
    Then the response status code should be 200
    And the response body should be:
      """json
      {
        "hello": "world"
      }
      """