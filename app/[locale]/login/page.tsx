"use client";
import { FaUser } from "react-icons/fa6";
import { BiSolidLockAlt } from "react-icons/bi";
import { FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const loginSchema = z.object({
  login: z.string().min(1, "Username requis"),
  password: z.string().min(6, "Mot de passe trop court"),
});

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession(); 

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const login = formData.get("login")?.toString() || "";
    const password = formData.get("password")?.toString() || "";


    // 🔍 Validation Zod côté client
    const parsed = loginSchema.safeParse({ login, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    const result = await signIn("credentials", {
      login: parsed.data.login,
      password: parsed.data.password,
      redirect: false,
    });

    if (result?.ok) {
      alert("Connexion réussie !");
      router.push("/dashboard");
    } else {
      setError("login ou mot de passe incorrect");
    }
    if (session) {
    // si l'utilisateur est déjà connecté, on redirige vers dashboard
    alert("Vous êtes déjà connecté !");
    router.push("/dashboard");
    return null;
  }
  }

  return (
    <div className="min-h-screen w-screen bg-[#EDEDED] flex items-center justify-center">
      <div className="h-full w-full flex items-center justify-center container container-padding">
        <form
          onSubmit={handleSubmit}
          className="relative px-10 pb-10 pt-12 bg-white rounded-md flex flex-col gap-5 shadow-md w-full max-w-md"
        >
          <span className="absolute -top-8.75 left-1/2 -translate-x-1/2 flex items-center justify-center size-17.5 rounded-full bg-[#07b8d3] shrink-0">
            <FaUser className="size-10 text-white" />
          </span>
          <h1 className="text-xl font-bold text-center text-gray-500">Login</h1>

          <span className="relative">
            <input
              type="text"
              name="login"
              placeholder="Username"
              className="w-full text-base border border-gray-300 rounded-md pl-4 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-[#27DAF5]"
            />
            <FaUser className="size-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2" />
          </span>

          <span className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full text-base border border-gray-300 rounded-md pl-4 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-[#27DAF5]"
            />
            <BiSolidLockAlt className="size-4 text-gray-500 absolute right-2 top-1/2 -translate-y-1/2" />
          </span>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="cursor-pointer text-base font-medium bg-[#07b8d3] text-white rounded-md px-4 py-2 hover:bg-[#1bb8d6] transition-colors"
          >
            LOGIN
          </button>

          <p className="text-xs text-gray-500 capitalize text-center">
            Forgot{" "}
            <Link href="/login/forgot" className="text-[#07b8d3] cursor-pointer">
              password
            </Link>
            ?
          </p>
        </form>
      </div>
    </div>
  );
}
