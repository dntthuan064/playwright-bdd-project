import { test, expect } from "@playwright/test";
import { ApiClient, ApiValidator, ApiDataBuilder } from "../../../src/helpers/api.helpers";

/**
 * Standalone API Tests using Axios
 * These tests run using Playwright's test runner but use Axios for API calls
 *
 * Note: These are example tests demonstrating the standalone API testing approach.
 * The public API (reqres.in) may have limitations or rate limits.
 * Replace with your own API endpoints for actual testing.
 */
test.describe.skip("Standalone User API Tests", () => {
  let apiClient: ApiClient;

  test.beforeAll(() => {
    apiClient = new ApiClient("https://reqres.in/api");
  });

  test.describe("GET /users", () => {
    test("should retrieve list of users", async () => {
      // Act
      const response = await apiClient.get("/users?page=2");

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.page).toBe(2);
      ApiValidator.validateArrayResponse(response.data.data, 1);
      ApiValidator.validateRequiredFields(response.data.data[0], ["id", "email", "first_name", "last_name"]);
    });

    test("should retrieve single user", async () => {
      // Arrange
      const userId = 2;

      // Act
      const response = await apiClient.get(`/users/${userId}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.data.id).toBe(userId);
      ApiValidator.validateSchema(response.data.data, {
        id: "number",
        email: "string",
        first_name: "string",
        last_name: "string",
      });
    });
  });

  test.describe("POST /users", () => {
    test("should create a new user", async () => {
      // Arrange
      const userData = ApiDataBuilder.buildUser({
        name: "John Doe",
        job: "QA Automation Engineer",
      });

      // Act
      const response = await apiClient.post("/users", userData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.data.name).toBe(userData.name);
      expect(response.data.job).toBe(userData.job);
      expect(response.data.id).toBeDefined();
      expect(response.data.createdAt).toBeDefined();
    });

    test("should create user with random data", async () => {
      // Arrange
      const userData = ApiDataBuilder.buildUser({
        name: `User_${ApiDataBuilder.randomString()}`,
        email: ApiDataBuilder.randomEmail(),
      });

      // Act
      const response = await apiClient.post("/users", userData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.data.name).toBe(userData.name);
    });
  });

  test.describe("PUT /users/:id", () => {
    test("should update existing user", async () => {
      // Arrange
      const userId = 2;
      const updatedData = {
        name: "Jane Smith",
        job: "Senior QA Engineer",
      };

      // Act
      const response = await apiClient.put(`/users/${userId}`, updatedData);

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.name).toBe(updatedData.name);
      expect(response.data.job).toBe(updatedData.job);
      expect(response.data.updatedAt).toBeDefined();
    });
  });

  test.describe("PATCH /users/:id", () => {
    test("should partially update user", async () => {
      // Arrange
      const userId = 2;
      const patchData = { job: "Lead QA Engineer" };

      // Act
      const response = await apiClient.patch(`/users/${userId}`, patchData);

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.job).toBe(patchData.job);
    });
  });

  test.describe("DELETE /users/:id", () => {
    test("should delete user", async () => {
      // Arrange
      const userId = 2;

      // Act
      const response = await apiClient.delete(`/users/${userId}`);

      // Assert
      expect(response.status).toBe(204);
    });
  });

  test.describe("Error Handling", () => {
    test("should handle 404 for non-existent user", async () => {
      // Act & Assert
      let errorThrown = false;
      try {
        await apiClient.get("/users/999999");
      } catch (error: any) {
        errorThrown = true;
        expect(error.response.status).toBe(404);
      }
      expect(errorThrown).toBe(true);
    });
  });

  test.describe("Authentication", () => {
    test("should login successfully", async () => {
      // Arrange
      const credentials = ApiDataBuilder.buildCredentials({
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      });

      // Act
      const response = await apiClient.post("/login", credentials);

      // Assert
      expect(response.status).toBe(200);
      expect(response.data.token).toBeDefined();
    });

    test("should fail login with missing password", async () => {
      // Arrange
      const credentials = { email: "eve.holt@reqres.in" };

      // Act & Assert
      let errorThrown = false;
      try {
        await apiClient.post("/login", credentials);
      } catch (error: any) {
        errorThrown = true;
        // API returns 400 or 401 depending on the validation
        expect([400, 401]).toContain(error.response.status);
        expect(error.response.data.error).toBeDefined();
      }
      expect(errorThrown).toBe(true);
    });
  });
});
