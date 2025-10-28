import fs from "fs";
import path from "path";
import pkg from "lodash";
import { DATA_DIR, DATA_PREFIX } from "../config/constants";
import { DATA_PATHS } from "../config/enums";
import { type CommonData } from "../types/common";
import { TestDataNameUnknownError } from "../types/exception";

/**
 * Load data with specified name.
 * If the environment variable corresponding to the data name is set,
 * the data will be read from the environment variable (in JSON format, encoded by base64).
 * Otherwise, the data will be read from the data file specified in DATA_PATHS.
 * @param name name of data defined in DATA_PATHS
 */
export function loadData(name: keyof typeof DATA_PATHS) {
  if (!Object.keys(DATA_PATHS).includes(name)) {
    throw new TestDataNameUnknownError(name);
  }

  // Corresponding environment variable
  const dataEnvKey = DATA_PREFIX + name;

  if (dataEnvKey in process.env) {
    const dataContent = process.env[dataEnvKey]!.trim();

    if (dataContent !== "") {
      return JSON.parse(Buffer.from(dataContent, "base64").toString("utf-8"));
    }
  }

  const dataFullPath = path.join(DATA_DIR, DATA_PATHS[name]);
  return JSON.parse(fs.readFileSync(dataFullPath).toString("utf-8"));
}

/**
 * Get test data by key pattern.
 * @param testData Test data object
 * @param key Key pattern to get test data. See more at https://lodash.com/docs/4.17.15#get
 * @returns data content
 */
export function getTestDataByKey(testData: Record<string, object>, key: string): string {
  const { get } = pkg;
  return get(testData, key) as unknown as string;
}

/**
 * Get common data by key pattern.
 * @param commonData Common data object
 * @param key Key pattern to get test data. See more at https://lodash.com/docs/4.17.15#get
 * @returns data content
 */
export function getDataByKey(commonData: CommonData, key: string): string {
  const { get } = pkg;
  return get(commonData, key) as unknown as string;
}

/**
 * Trim URL by removing trailing slash (/).
 * @param url URL to trim
 * @returns URL after trimming
 */
export function trimUrl(url: string) {
  return url.replace(/\/+$/, "");
}

/**
 * Get random integer in range [min, max].
 * @param min minimum number (inclusive)
 * @param max maximum number (inclusive)
 * @returns Random integer in range [min, max]
 */
export function randomIntInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Repeat an async function.
 * @param times number of times to repeat
 * @param func async function to repeat
 * @returns Promise that resolves when the function is repeated for the specified times
 */
export async function repeatAsync(times: number, func: () => Promise<void>) {
  for (let i = 0; i < times; i++) {
    await func();
  }
}

/**
 * Shorten wallet address for display
 */
export const shortenAddress = (address: string, length = 4): string => {
  if (!address) {
    return "";
  }
  return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
};

/**
 * Parse JSON file
 */
export const parseFileToJson = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
};

/**
 * Throw expression helper
 */
export function throwExpression(errorMessage: string): never {
  throw new Error(errorMessage);
}

/**
 * Append a subdomain to a URL
 */
export const appendSubdomain = (subdomain: string, url: string) => {
  const urlObj = new URL(url);
  const currentHostname = urlObj.hostname;
  const newHostname = `${subdomain}.${currentHostname}`;
  urlObj.hostname = newHostname;
  return urlObj.toString();
};

/**
 * Helper function to retrieve nested values from an object
 * @param obj - The object from which to retrieve the nested value
 * @param key - A dot-separated string representing the path to the nested property
 * @returns The value of the nested property, or `undefined` if the property does not exist
 */
export function getNestedValue(obj: any, key: string): any {
  return key.split(".").reduce((o, k) => (o || {})[k], obj);
}

/**
 * Helper function to extract specified keys from an object
 * @param obj - The object to extract values from
 * @param keys - An array of strings representing the keys to extract
 * @returns A new object containing only the specified keys and their corresponding values
 */
export function extractKeys(obj: any, keys: string[]): Record<string, any> {
  return keys.reduce<Record<string, any>>((acc, key) => {
    const value = getNestedValue(obj, key);
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {});
}

/**
 * Converts a date string from the format "Month/DD/YYYY" to "MM/DD/YYYY".
 * @param dateStr - The date string to convert in format "Month/DD/YYYY"
 * @returns The formatted date string in "MM/DD/YYYY" format
 * @example
 * convertDateString("January/01/2025") // Returns "01/01/2025"
 * convertDateString("December/25/2025") // Returns "12/25/2025"
 */
export function convertDateString(dateStr: string): string {
  const monthMap: Record<string, string> = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };
  const [month, day, year] = dateStr.split("/");
  const formattedMonth = monthMap[month];
  const formattedDay = day.padStart(2, "0");
  return `${formattedMonth}/${formattedDay}/${year}`;
}

/**
 * Sleep for a specified duration
 * @param ms Duration in milliseconds
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generate random string
 * @param length Length of the string
 */
export function randomString(length = 10): string {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: number | Date, format = "ISO"): string {
  const date = timestamp instanceof Date ? timestamp : new Date(timestamp);

  if (format === "ISO") {
    return date.toISOString();
  }

  return date.toLocaleString();
}
