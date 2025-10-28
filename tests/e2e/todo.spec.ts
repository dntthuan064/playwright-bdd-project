import { test, expect } from "../fixtures/test.fixtures";

test.describe("Todo Management", () => {
  test.beforeEach(async ({ todoPage }) => {
    await todoPage.goto();
  });

  test("should add a new todo item", async ({ todoPage }) => {
    // Arrange
    const todoItem = "Buy milk";

    // Act
    await todoPage.addTodo(todoItem);

    // Assert
    const todos = await todoPage.getTodos();
    expect(todos).toContain(todoItem);
  });

  test("should add multiple todo items", async ({ todoPage }) => {
    // Arrange
    const items = ["Feed cat", "Read book"];

    // Act
    for (const item of items) {
      await todoPage.addTodo(item);
    }

    // Assert
    const todos = await todoPage.getTodos();
    expect(todos).toContain(items[0]);
    expect(todos).toContain(items[1]);
  });

  test("should complete a todo item", async ({ todoPage, page }) => {
    // Arrange
    const todoItem = "Finish homework";
    await todoPage.addTodo(todoItem);

    // Act
    await todoPage.completeTodo(0);

    // Assert
    const todoElement = page.getByTestId("todo-item").nth(0);
    await expect(todoElement).toHaveClass(/completed/);
  });

  test("should display correct count of todos", async ({ todoPage }) => {
    // Arrange
    const items = ["Task 1", "Task 2", "Task 3"];

    // Act
    for (const item of items) {
      await todoPage.addTodo(item);
    }

    // Assert
    const todos = await todoPage.getTodos();
    expect(todos).toHaveLength(items.length);
  });
});
