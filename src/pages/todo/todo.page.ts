import { Page, Locator } from "@playwright/test";

import { PAGE_PATH } from "../../config/constants";
import { BasePage } from "../base.page";

export class TodoPage extends BasePage {
  newTodo: Locator;
  todoItems: Locator;

  constructor(page: Page) {
    super(page, PAGE_PATH.TODO);

    this.newTodo = page.getByPlaceholder("What needs to be done?");
    this.todoItems = page.getByTestId("todo-title");
  }

  async addTodo(item: string) {
    await this.newTodo.fill(item);
    await this.newTodo.press("Enter");
  }

  async getTodos() {
    return this.todoItems.allTextContents();
  }

  async completeTodo(index: number) {
    await this.page.getByTestId("todo-item").nth(index).getByRole("checkbox").check();
  }
}
