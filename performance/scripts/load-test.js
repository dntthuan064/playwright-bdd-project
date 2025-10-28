import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

// Custom metrics
const errorRate = new Rate("errors");
const responseTrend = new Trend("response_time");

// Test configuration
export const options = {
  stages: [
    { duration: "30s", target: 10 }, // Ramp up to 10 users over 30 seconds
    { duration: "1m", target: 10 }, // Stay at 10 users for 1 minute
    { duration: "30s", target: 50 }, // Ramp up to 50 users over 30 seconds
    { duration: "2m", target: 50 }, // Stay at 50 users for 2 minutes
    { duration: "30s", target: 0 }, // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ["p(95)<500", "p(99)<1000"], // 95% of requests should be below 500ms
    http_req_failed: ["rate<0.05"], // Error rate should be less than 5%
    errors: ["rate<0.1"], // Custom error rate should be less than 10%
  },
};

const BASE_URL = __ENV.API_BASE_URL || "https://reqres.in/api";

export default function () {
  // Test 1: Get list of users
  const listResponse = http.get(`${BASE_URL}/users?page=1`);

  const listCheck = check(listResponse, {
    "list users status is 200": (r) => r.status === 200,
    "list users response time < 500ms": (r) => r.timings.duration < 500,
    "list users has data": (r) => {
      const body = JSON.parse(r.body);
      return body.data && body.data.length > 0;
    },
  });

  errorRate.add(!listCheck);
  responseTrend.add(listResponse.timings.duration);

  sleep(1);

  // Test 2: Get single user
  const userId = Math.floor(Math.random() * 10) + 1;
  const userResponse = http.get(`${BASE_URL}/users/${userId}`);

  const userCheck = check(userResponse, {
    "get user status is 200": (r) => r.status === 200,
    "get user response time < 300ms": (r) => r.timings.duration < 300,
    "user has valid data": (r) => {
      const body = JSON.parse(r.body);
      return body.data && body.data.id === userId;
    },
  });

  errorRate.add(!userCheck);
  responseTrend.add(userResponse.timings.duration);

  sleep(1);

  // Test 3: Create user
  const payload = JSON.stringify({
    name: `LoadTest_User_${__VU}_${__ITER}`,
    job: "QA Engineer",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const createResponse = http.post(`${BASE_URL}/users`, payload, params);

  const createCheck = check(createResponse, {
    "create user status is 201": (r) => r.status === 201,
    "create user response time < 500ms": (r) => r.timings.duration < 500,
    "created user has id": (r) => {
      const body = JSON.parse(r.body);
      return body.id !== undefined;
    },
  });

  errorRate.add(!createCheck);
  responseTrend.add(createResponse.timings.duration);

  sleep(2);
}

export function handleSummary(data) {
  return {
    "performance/reports/load-test-summary.json": JSON.stringify(data, null, 2),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

function textSummary(data, options) {
  const indent = options.indent || "";
  const enableColors = options.enableColors || false;

  let summary = "\n" + indent + "=== Load Test Summary ===\n\n";

  if (data.metrics) {
    summary += indent + "Metrics:\n";
    Object.entries(data.metrics).forEach(([name, metric]) => {
      if (metric.values) {
        summary += indent + `  ${name}:\n`;
        Object.entries(metric.values).forEach(([key, value]) => {
          summary += indent + `    ${key}: ${value}\n`;
        });
      }
    });
  }

  return summary;
}
