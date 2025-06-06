@test
Feature: Todo Management

  @test
  Scenario: Add a new todo
    Given I navigate to "todoPage"
    When I add a todo "Buy milk"
    Then I should see "Buy milk" in the list

  Scenario Outline: Add multiple todos
    Given I navigate to "todoPage"
    When I add a todo "<item>"
    Then I should see "<item>" in the list

    Examples:
      | item      |
      | Feed cat  |
      | Read book |

  Scenario: Complete a todo
    Given I navigate to "todoPage"
    When I add a todo "Finish homework"
    And I complete the todo at index 0
    Then the todo at index 0 should be marked as completed
