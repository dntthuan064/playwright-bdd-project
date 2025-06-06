/**
 * Secrets data for all scenarios.
 */

export interface SecretsData {
  admin: LoginInfo
  adminInstitution: LoginInfo
  reviewer: LoginInfo
  user: LoginInfo
  commonPassword: string
}

export interface LoginInfo {
  email: string
  password: string
}

// role defined in secrets.json
export enum UserRole {
  Admin = "admin",
  AdminInstitution = "adminInstitution",
  Reviewer = "reviewer",
  User = "user"
}
