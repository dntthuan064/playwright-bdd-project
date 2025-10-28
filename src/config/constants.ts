import { ENV_KEYS } from "../config/enums";

/**
 * Environment variables configuration
 */
export const ENV = Object.values(ENV_KEYS).reduce<Record<ENV_KEYS, string>>(
  (acc, key) => {
    acc[key as ENV_KEYS] = process.env[key] || "";
    return acc;
  },
  {
    E2E_BASE_URL: "",
    E2E_PORTAL_URL: "",
    E2E_SUBDOMAIN: "",
    HEADLESS_MODE: "",
    E2E_LOCAL: "",
    E2E_LOCAL_URL: "",
  }
);

/**
 * Test data configuration
 */
export const DATA_PREFIX = "E2E_DATA_";
export const DATA_DIR = "./src/features";

/**
 * Page paths for navigation
 */
export const PAGE_PATH = {
  TODO: "/todomvc",
  HOME: "/",
} as const;

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  USERS: "/users",
  LOGIN: "/login",
  REGISTER: "/register",
} as const;
