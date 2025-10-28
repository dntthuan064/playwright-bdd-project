/**
 * Common data types for all scenarios
 */

import { type SecretsData } from "./secrets";

export interface CommonData extends Partial<SecretsData> {
  todoItem: string;
}
