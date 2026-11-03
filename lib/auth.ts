// lib/auth.ts
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "./db";
import { loginSchema } from "./validators/auth";
import type { RowDataPacket } from "mysql2/promise";
import type { AuthOptions, SessionStrategy } from "next-auth";
import type { DefaultUser } from "next-auth";
import jwt from "jsonwebtoken";
import { toast } from "sonner";

// ================= CONFIG =================
const sessionStrategy: SessionStrategy = "jwt";

export const authOptions: AuthOptions = {
  debug: true,
  session: {
    strategy: sessionStrategy,
    maxAge: 60 * 60 * 24, // 1 jour
  },

  providers: [
    Credentials({
      credentials: {
        login: { label: "Username", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;
        // Validation Zod
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { login, password } = parsed.data;

        const [rows] = await db.query<RowDataPacket[]>(
          "SELECT id, login, email, password FROM admin WHERE login = ? LIMIT 1",
          [login],
        );

        if (!rows.length) return null;

        const user = rows[0];

        const valid = await compare(password, user.password);
        if (!valid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          login: user.login,
        };
      },
    }),
  ],
  callbacks: {
    // ================= JWT =================
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.login = user.login;
        token.email = user.email;

        if (!process.env.JWT_SECRET) {
          throw new Error("JWT_SECRET manquant");
        }

        const signedToken = jwt.sign(
          {
            id: user.id,
            login: user.login,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }, // expiration 1 jour
        );

        token.accessToken = signedToken; // token JWT exposé au frontend via session callback
        // : affichage console
        //console.log("JWT GÉNÉRÉ :", token.accessToken);
      }

      return token;
    },
    // ================= SESSION =================
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        login: token.login as string,
        email: token.email as string,
      };
      // ⚡ exposer le JWT signé au frontend
      session.accessToken = token.accessToken as string;

      //console.log("SESSION CALLBACK - ACCESS TOKEN :", session.accessToken);
      return session;
    },
  },
};
