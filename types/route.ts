export const baseUrl = "http://localhost:3001/api";
export type RouteType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS";
export interface RouteConfig {
  url: string;
  method: RouteType;
}