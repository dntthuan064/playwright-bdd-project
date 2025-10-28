export const TodoTestData = {
  validItems: ["Buy groceries", "Walk the dog", "Read a book", "Write documentation", "Complete project"],

  specialCharacterItems: ["Item with @#$%", "Item with émojis 🎉", "Item with 日本語"],

  longItem:
    "This is a very long todo item that contains a lot of text to test how the application handles lengthy inputs and whether it truncates or displays the full text properly",

  emptyItem: "",

  duplicateItems: ["Duplicate task", "Duplicate task"],
} as const;
