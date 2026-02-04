import { RouteConfig, baseUrl } from "../../types/route";


export const userRoutes = {
  getAllUsers: <RouteConfig>{
    url: `${baseUrl}/users`,
    method: "GET",
  },
  createUser: <RouteConfig>{
    url: `${baseUrl}/users`,
    method: "POST",
  },
  updateUser: <RouteConfig>{
    url: `${baseUrl}/users`,
    method: "PATCH",
  },
  deleteUser: <RouteConfig>{
    url: `${baseUrl}/users`,
    method: "DELETE",
  },
}