"use client"
import useSWR from "swr"
import { getUsers } from "../services/user-service"
import { userRoutes } from "../lib/routes/user"

export function useUsers() {
  const { data, error, isLoading } = useSWR(
    userRoutes.getAllUsers.url,
    getUsers
  )

  return {
    users: data,
    isLoading,
    isError: error,
  }
}
