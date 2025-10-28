import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * API Client for standalone API testing
 * Provides a reusable HTTP client with common functionality
 */
export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
      ...config,
    });

    // Request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error("[API Request Error]", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for logging
    this.client.interceptors.response.use(
      (response) => {
        console.log(`[API Response] ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error("[API Response Error]", error.response?.status, error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * GET request
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  /**
   * POST request
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  /**
   * PUT request
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  /**
   * PATCH request
   */
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }

  /**
   * DELETE request
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  /**
   * Set authorization header
   */
  setAuthToken(token: string): void {
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  /**
   * Remove authorization header
   */
  clearAuthToken(): void {
    delete this.client.defaults.headers.common["Authorization"];
  }

  /**
   * Set custom header
   */
  setHeader(key: string, value: string): void {
    this.client.defaults.headers.common[key] = value;
  }

  /**
   * Get the axios instance for advanced usage
   */
  getInstance(): AxiosInstance {
    return this.client;
  }
}

/**
 * Response validation utilities
 */
export class ApiValidator {
  /**
   * Validate response status code
   */
  static validateStatus(response: AxiosResponse, expectedStatus: number): void {
    if (response.status !== expectedStatus) {
      throw new Error(`Expected status ${expectedStatus}, but got ${response.status}`);
    }
  }

  /**
   * Validate response has required fields
   */
  static validateRequiredFields(data: any, requiredFields: string[]): void {
    const missingFields = requiredFields.filter((field) => !(field in data));
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }
  }

  /**
   * Validate response schema matches expected structure
   */
  static validateSchema(data: any, schema: Record<string, string>): void {
    Object.entries(schema).forEach(([key, expectedType]) => {
      if (!(key in data)) {
        throw new Error(`Missing field: ${key}`);
      }
      const actualType = typeof data[key];
      if (actualType !== expectedType) {
        throw new Error(`Field ${key} has type ${actualType}, expected ${expectedType}`);
      }
    });
  }

  /**
   * Validate array response
   */
  static validateArrayResponse(data: any, minLength = 0): void {
    if (!Array.isArray(data)) {
      throw new Error("Response is not an array");
    }
    if (data.length < minLength) {
      throw new Error(`Array length ${data.length} is less than minimum ${minLength}`);
    }
  }
}

/**
 * API data builders for test data generation
 */
export class ApiDataBuilder {
  /**
   * Build user data
   */
  static buildUser(overrides?: Partial<{ name: string; job: string; email: string }>) {
    return {
      name: "Test User",
      job: "QA Engineer",
      email: "test@example.com",
      ...overrides,
    };
  }

  /**
   * Build login credentials
   */
  static buildCredentials(overrides?: Partial<{ email: string; password: string }>) {
    return {
      email: "test@example.com",
      password: "password123",
      ...overrides,
    };
  }

  /**
   * Generate random string
   */
  static randomString(length = 10): string {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  }

  /**
   * Generate random email
   */
  static randomEmail(): string {
    return `test_${this.randomString()}@example.com`;
  }
}
