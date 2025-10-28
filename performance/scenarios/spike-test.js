import http from "k6/http";
import { check, sleep } from "k6";

// Spike test - sudden increase in load
export const options = {
  stages: [
    { duration: "10s", target: 10 }, // Normal load
    { duration: "20s", target: 10 }, // Stay at normal load
    { duration: "10s", target: 100 }, // Sudden spike
    { duration: "1m", target: 100 }, // Maintain spike
    { duration: "10s", target: 10 }, // Drop back to normal
    { duration: "20s", target: 10 }, // Recover
    { duration: "10s", target: 0 }, // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // More lenient during spike
    http_req_failed: ["rate<0.15"], // Allow higher error rate during spike
  },
};

const BASE_URL = __ENV.API_BASE_URL || "https://reqres.in/api";

export default function () {
  const response = http.get(`${BASE_URL}/users?page=1`);

  check(response, {
    "status is 200": (r) => r.status === 200,
    "response time acceptable": (r) => r.timings.duration < 3000,
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "performance/reports/spike-test-summary.json": JSON.stringify(data, null, 2),
  };
}
