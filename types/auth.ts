export type UserRole =
  | "STUDENT"
  | "INSTRUCTOR"
  | "RECRUITER"
  | "ADMIN";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleLoginRequest {
  credential: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  email: string;
  role: UserRole;
}

export type LoginResponse = AuthResponse;