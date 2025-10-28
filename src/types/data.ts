import path from "path";
import { SecretsData } from "./secrets";
import { parseFileToJson } from "../../src/helpers/utils";
import { CommonData } from "./common";

/**
 * Secrets data provider for accessing secure test data
 */
export class SecretsDataProvider {
  public secretsData: SecretsData;

  constructor() {
    const secretPath = path.join(process.cwd(), "src", "secrets.json");
    this.secretsData = parseFileToJson(secretPath);
  }
}

/**
 * Common data provider for accessing shared test data
 * Variables shared between tests should be defined here
 */
export class CommonDataProvider {
  public commonData: CommonData = {
    todoItem: "",
  };

  constructor() {
    const dataPath = path.join(process.cwd(), "src", "common.json");
    this.commonData = parseFileToJson(dataPath);
  }
}
