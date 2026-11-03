// services/user-service.ts
import { toast } from "sonner";
import { userRoutes } from "../lib/routes/user";
import { getSession } from "next-auth/react";

export async function request(route: typeof userRoutes[keyof typeof userRoutes], body?: any) {
  const session = await getSession();
  const token = session?.accessToken;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const options: RequestInit = {
    method: route.method,
    headers,
    credentials: "include",
  };

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(route.url, options);

  if (!res.ok) { 
    const errorData = await res.json().catch(() => ({}));
     const errorMessage = errorData?.message || `Erreur: ${res.status}`;
     toast.error(errorMessage);
     throw new Error(errorMessage);
  }

  return res.json();
}

// Usage pour GET
export const getUsers = () => request(userRoutes.getAllUsers);

// Usage pour POST
export const createUser = (user: { name: string; email: string }) =>
  request(userRoutes.createUser, user);

// Usage pour PATCH
export const updateUser = (user: { id: string; name: string; email: string }) =>
  request(userRoutes.updateUser, user);

// Usage pour DELETE
export const deleteUser = (id: string) =>
  request(userRoutes.deleteUser, { id });
