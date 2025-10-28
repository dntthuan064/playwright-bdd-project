/**
 * Secrets data types for authentication and secure information
 */

export interface SecretsData {
  admin: LoginInfo;
  adminInstitution: LoginInfo;
  reviewer: LoginInfo;
  user: LoginInfo;
  commonPassword: string;
}

export interface LoginInfo {
  email: string;
  password: string;
}

/**
 * User roles defined in secrets.json
 */
export enum UserRole {
  Admin = "admin",
  AdminInstitution = "adminInstitution",
  Reviewer = "reviewer",
  User = "user",
}
