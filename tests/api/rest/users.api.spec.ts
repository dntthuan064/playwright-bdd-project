import { test, expect } from "@playwright/test";

/**
 * API Tests using Playwright's request context
 * These tests demonstrate REST API testing integrated with Playwright
 *
 * Note: These tests use a public demo API (reqres.in) which may have rate limits.
 * Some tests are marked as examples (.only removed for CI).
 * Replace with your own API endpoints for actual testing.
 */
test.describe("User API Tests", () => {
  const baseURL = "https://reqres.in/api";

  // Helper function to handle rate limiting
  const skipIfRateLimited = (response: any) => {
    if (response.status() === 429) {
      test.skip(true, "API rate limit reached");
    }
  };

  test("should get list of users", async ({ request }) => {
    // Act
    const response = await request.get(`${baseURL}/users?page=2`);
    skipIfRateLimited(response);
    const data = await response.json();

    // Assert
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(data.page).toBe(2);
    expect(data.data).toHaveLength(6);
    expect(data.data[0]).toHaveProperty("id");
    expect(data.data[0]).toHaveProperty("email");
    expect(data.data[0]).toHaveProperty("first_name");
  });

  test("should get single user by id", async ({ request }) => {
    // Arrange
    const userId = 2;

    // Act
    const response = await request.get(`${baseURL}/users/${userId}`);
    const data = await response.json();

    // Assert
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(data.data.id).toBe(userId);
    expect(data.data.email).toBeTruthy();
  });

  test.skip("should create a new user", async ({ request }) => {
    // Arrange
    const newUser = {
      name: "John Doe",
      job: "QA Engineer",
    };

    // Act
    const response = await request.post(`${baseURL}/users`, {
      data: newUser,
    });
    const data = await response.json();

    // Assert
    expect(response.status()).toBe(201);
    expect(data.name).toBe(newUser.name);
    expect(data.job).toBe(newUser.job);
    expect(data.id).toBeTruthy();
    expect(data.createdAt).toBeTruthy();
  });

  test.skip("should update user information", async ({ request }) => {
    // Arrange
    const userId = 2;
    const updatedUser = {
      name: "Jane Smith",
      job: "Senior QA Engineer",
    };

    // Act
    const response = await request.put(`${baseURL}/users/${userId}`, {
      data: updatedUser,
    });
    const data = await response.json();

    // Assert
    expect(response.status()).toBe(200);
    expect(data.name).toBe(updatedUser.name);
    expect(data.job).toBe(updatedUser.job);
    expect(data.updatedAt).toBeTruthy();
  });

  test.skip("should partially update user", async ({ request }) => {
    // Arrange
    const userId = 2;
    const updateData = {
      job: "Lead QA Engineer",
    };

    // Act
    const response = await request.patch(`${baseURL}/users/${userId}`, {
      data: updateData,
    });
    const data = await response.json();

    // Assert
    expect(response.status()).toBe(200);
    expect(data.job).toBe(updateData.job);
    expect(data.updatedAt).toBeTruthy();
  });

  test.skip("should delete user", async ({ request }) => {
    // Arrange
    const userId = 2;

    // Act
    const response = await request.delete(`${baseURL}/users/${userId}`);

    // Assert
    expect(response.status()).toBe(204);
  });

  test.skip("should handle 404 for non-existent user", async ({ request }) => {
    // Act
    const response = await request.get(`${baseURL}/users/999999`);

    // Assert
    expect(response.status()).toBe(404);
  });

  test.skip("should successfully login with valid credentials", async ({ request }) => {
    // Arrange
    const credentials = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };

    // Act
    const response = await request.post(`${baseURL}/login`, {
      data: credentials,
    });
    const data = await response.json();

    // Assert
    expect(response.status()).toBe(200);
    expect(data.token).toBeTruthy();
  });

  test("should fail login with missing password", async ({ request }) => {
    // Arrange
    const credentials = {
      email: "eve.holt@reqres.in",
    };

    // Act
    const response = await request.post(`${baseURL}/login`, {
      data: credentials,
    });
    const data = await response.json();

    // Assert
    // API returns 400, 401, or 429 (rate limit) depending on the situation
    expect([400, 401, 429]).toContain(response.status());
    if (response.status() !== 429) {
      expect(data.error).toBeTruthy();
    }
  });
});
