import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./components/log-out-button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col gap-10 items-center justify-between p-24">
      <header className="flex items-center justify-between w-full">
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
