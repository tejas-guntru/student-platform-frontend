export type UserRole =
  | "STUDENT"
  | "ADMIN";

export interface GoogleLoginRequest {
  credential: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}


export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
}


export interface AuthResponse {
  token: string;
  tokenType: string;
  email: string;
  role: UserRole;
}


// Keeping this alias so existing login code
// continues working without changes.
export type LoginResponse =
  AuthResponse;

export type RegisterResponse =
  AuthResponse;