/**
 * K6 Performance Testing Configuration
 *
 * This file contains shared configuration for K6 performance tests.
 * Environment-specific settings can be overridden via environment variables.
 */

export const config = {
  // Base URL for API testing
  baseURL: process.env.API_BASE_URL || "https://reqres.in/api",

  // Default thresholds for all tests
  defaultThresholds: {
    http_req_duration: ["p(95)<500", "p(99)<1000"],
    http_req_failed: ["rate<0.05"],
  },

  // Load test configuration
  loadTest: {
    stages: [
      { duration: "30s", target: 10 },
      { duration: "1m", target: 10 },
      { duration: "30s", target: 50 },
      { duration: "2m", target: 50 },
      { duration: "30s", target: 0 },
    ],
  },

  // Stress test configuration
  stressTest: {
    stages: [
      { duration: "1m", target: 20 },
      { duration: "2m", target: 20 },
      { duration: "1m", target: 50 },
      { duration: "2m", target: 50 },
      { duration: "1m", target: 100 },
      { duration: "3m", target: 100 },
      { duration: "1m", target: 0 },
    ],
  },

  // Spike test configuration
  spikeTest: {
    stages: [
      { duration: "10s", target: 10 },
      { duration: "20s", target: 10 },
      { duration: "10s", target: 100 }, // Sudden spike
      { duration: "1m", target: 100 },
      { duration: "10s", target: 10 },
      { duration: "20s", target: 10 },
      { duration: "10s", target: 0 },
    ],
  },

  // Soak test configuration (endurance testing)
  soakTest: {
    stages: [
      { duration: "2m", target: 20 },
      { duration: "3h", target: 20 }, // Long duration at moderate load
      { duration: "2m", target: 0 },
    ],
  },
};

export default config;
