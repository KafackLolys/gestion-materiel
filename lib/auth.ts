import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "./db";
import { loginSchema } from "./validators/auth";
import type { RowDataPacket } from "mysql2/promise";
import type { AuthOptions, SessionStrategy } from "next-auth";
import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    login?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    login?: string;
    email?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      login?: string;
      name?: string | null;
      email?: string | null;
    };
  }
}

// ⚡ Définir le type exact pour la session
const sessionStrategy: SessionStrategy = "jwt";

export const authOptions: AuthOptions = {
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
    // 🔑 ajouter les infos utilisateur dans le token JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.login = user.login;
        if (user.email) {
          token.email = user.email;
        }
      }
      return token;
    },
    // 🔑 mettre les infos du token dans la session côté frontend
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          login: token.login as string,
          email: token.email as string,
        };
      }
      return session;
    },
  },
};
