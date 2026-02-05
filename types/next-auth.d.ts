import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    login: string;
    email?: string;
  }

  interface Session {
    user: {
      id: string;
      login: string;
      email?: string | null;
    };
     accessToken?: string; // 👈 exposé au frontend
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    login?: string;
    email?: string;
    accessToken?: string;
  }
}
