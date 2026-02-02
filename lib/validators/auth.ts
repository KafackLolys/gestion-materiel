import { z } from "zod";

export const loginSchema = z.object({
  login: z.string().min(1, "Login requis"),
  password: z.string().min(6, "Mot de passe trop court"),
});

export type LoginInput = z.infer<typeof loginSchema>;
