"use client";
import Image from "next/image";
import LogoutButton from "./components/log-out-button";
import Link from "next/link";
import { useI18n, useScopedI18n } from "../../locales/client";

export default function Home() {
  const t = useI18n();
  //const scopedT = useScopedI18n('hello');
  return (
    <div className="flex min-h-screen flex-col gap-10 items-center justify-between p-24">
      <header className="flex items-center justify-between w-full">
        <p>{t('hello')}</p>
        <h1>Home page</h1>
        <LogoutButton />
      </header>
      <Link
        href="/login"
        className="bg-gray-100 text-black px-10 py-5 rounded-xl"
      >
        <h1 className="text-5xl font-bold">Login from</h1>
      </Link>
    </div>
  );
}
