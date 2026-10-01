import { api } from "@/lib/api";

import type {
  GoogleLoginRequest,
  LoginRequest,
  LoginResponse,
} from "@/types/auth";

// =========================================================
// PASSWORD LOGIN
// Instructor / Recruiter / Admin
// =========================================================

export const login = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/api/v1/auth/login",
    request
  );

  return response.data;
};

// =========================================================
// GOOGLE LOGIN
// Student only
// =========================================================

export const googleLogin = async (
  request: GoogleLoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/api/v1/auth/google",
    request
  );

  return response.data;
};