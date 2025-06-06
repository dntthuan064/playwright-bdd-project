/**
 * Common data for all scenarios.
 */

import { type SecretsData } from "./secrets"

export interface CommonData extends Partial<SecretsData> {
  address?: WalletAddress
}

export interface WalletAddress {
  name: string
  address: string
}
