import axios from "axios";
import { z } from "zod";
import { loginSchema } from "../types/user";
import { SiteListResponseSchema } from "../types/api";

// Axios instance (COOKIE BASED)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, 
});

//  Global 401 handler (COOKIE auth)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ---------- Site APIs ----------
export async function getSites() {
  const res = await api.get("/site");
  return SiteListResponseSchema.parse(res.data);
}

export async function getSiteHistory(siteId: string) {
  const res = await api.get(`/site/${siteId}/history`);
  return res.data;
}

// ---------- Auth APIs ----------
export interface LoginResponse {
  success: boolean;
  user?: { username: string; email: string };
  error?: string;
}

//  LOGIN (backend sets httpOnly cookie)
export async function loginUser(
  payload: z.infer<typeof loginSchema>
): Promise<LoginResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signin`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", 
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      error: data.error || "Login failed",
    };
  }

  return data;
}

//  VERIFY USER (COOKIE BASED)
export async function verifyUser() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
    {
      method: "GET",
      credentials: "include", 
    }
  );

  if (!response.ok) {
    throw new Error("Unauthorized");
  }

  return response.json();
}
