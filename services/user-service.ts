import { userRoutes } from "../lib/routes/user";

export async function request(route: typeof userRoutes[keyof typeof userRoutes], body?: any) {
  const options: RequestInit = {
    method: route.method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  if (body) options.body = JSON.stringify(body);

  const res = await fetch(route.url, options);

  if (!res.ok) throw new Error(`Request failed: ${res.status}`);


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
