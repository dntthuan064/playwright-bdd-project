/**
 * Data file paths (relative to features folder)
 */
export enum DATA_PATHS {
  USER = "/auth/user.local.json",
}

/**
 * Timeout values in milliseconds
 */
export enum TIMEOUT {
  XXXSHORT = 500,
  XXSHORT = 1000,
  XSHORT = 2000,
  SHORT = 5000,
  MEDIUM = 10000,
  LONG = 30000,
  XLONG = 60000,
}

/**
 * Environment variable keys
 */
export enum ENV_KEYS {
  BASE_URL = "E2E_BASE_URL",
  PORTAL_URL = "E2E_PORTAL_URL",
  SUBDOMAIN = "E2E_SUBDOMAIN",
  HEADLESS_MODE = "HEADLESS_MODE",
  LOCAL = "E2E_LOCAL",
  LOCAL_URL = "E2E_LOCAL_URL",
}
