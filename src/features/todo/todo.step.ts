import { expect, Given, Then, When } from "../../common/fixtures"

Given("I am on the Todo page", async ({ todoPage }) => {
  await todoPage.goto()
})

When("I add a todo {string}", async ({ todoPage }, item: string) => {
  await todoPage.addTodo(item)
})

Then("I should see {string} in the list", async ({ todoPage }, item: string) => {
  const todos = await todoPage.getTodos()
  expect(todos).toContain(item)
})

When("I complete the todo at index {int}", async ({ todoPage }, index: number) => {
  await todoPage.completeTodo(index)
})

Then("the todo at index {int} should be marked as completed", async ({ todoPage }, index: number) => {
  const todoItem = todoPage.getPage().getByTestId("todo-item").nth(index)
  await expect(todoItem).toHaveClass(/completed/)
})
