import path from "path"
import { SecretsData } from "./secrets"
import { parseFileToJson } from "../utils"
import { CommonData } from "./common"

/**
 * Secrets data.
 */
export class SecretsDataProvider {
  public secretsData: SecretsData

  constructor() {
    const secretPath = path.join(process.cwd(), "src", "secrets.json")

    this.secretsData = parseFileToJson(secretPath)
  }
}

/**
 *  Variables shared between steps should be defined here.
 */
export class CommonDataProvider {
  public commonData: CommonData = {}

  constructor() {
    const secretPath = path.join(process.cwd(), "src", "common.json")

    this.commonData = parseFileToJson(secretPath)
  }
}
