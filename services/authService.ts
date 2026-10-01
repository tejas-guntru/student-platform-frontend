import { api } from "@/lib/api";

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";

// =========================================================
// LOGIN
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
// REGISTER
// =========================================================

export const register = async (
  request: RegisterRequest
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    "/api/v1/auth/register",
    request
  );

  return response.data;
};