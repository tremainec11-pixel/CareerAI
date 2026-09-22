import { apiRequest } from "./api";

export async function login(email, password) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function register(email, password, fullName) {
  return apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      full_name: fullName,
    }),
  });
}

export async function getCurrentUser() {
  return apiRequest("/api/auth/me");
}