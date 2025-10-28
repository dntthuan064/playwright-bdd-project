import http from "k6/http";
import { check, sleep } from "k6";
import { Rate } from "k6/metrics";

const errorRate = new Rate("errors");

// Stress test configuration - gradually increase load beyond normal capacity
export const options = {
  stages: [
    { duration: "1m", target: 20 }, // Ramp up to 20 users
    { duration: "2m", target: 20 }, // Stay at 20 users
    { duration: "1m", target: 50 }, // Spike to 50 users
    { duration: "2m", target: 50 }, // Stay at 50 users
    { duration: "1m", target: 100 }, // Spike to 100 users (stress)
    { duration: "3m", target: 100 }, // Stay at 100 users
    { duration: "1m", target: 0 }, // Ramp down to 0
  ],
  thresholds: {
    http_req_duration: ["p(95)<1000"], // 95% of requests should be below 1s during stress
    http_req_failed: ["rate<0.1"], // Error rate should be less than 10% even under stress
  },
};

const BASE_URL = __ENV.API_BASE_URL || "https://reqres.in/api";

export default function () {
  const responses = http.batch([
    ["GET", `${BASE_URL}/users?page=1`],
    ["GET", `${BASE_URL}/users?page=2`],
    ["GET", `${BASE_URL}/users/${Math.floor(Math.random() * 10) + 1}`],
  ]);

  responses.forEach((response) => {
    const success = check(response, {
      "status is 200": (r) => r.status === 200,
      "response time OK": (r) => r.timings.duration < 2000,
    });
    errorRate.add(!success);
  });

  sleep(0.5); // Shorter sleep for stress testing
}

export function handleSummary(data) {
  return {
    "performance/reports/stress-test-summary.json": JSON.stringify(data, null, 2),
  };
}
