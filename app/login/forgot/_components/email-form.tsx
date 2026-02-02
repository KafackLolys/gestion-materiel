"use client";
import { cn } from "@/lib/utils";
import { PiPasswordDuotone } from "react-icons/pi";
import { useFormStateStore } from "../stores/use-switch-store";
export const EmailForm = () => {
  const { content, setContent } = useFormStateStore();
  return (
    <form
      action=""
      className={cn("relative px-10 pb-10 pt-12 bg-white rounded-md flex flex-col gap-5 shadow-md w-full max-w-md transition-all duration-500",
              content === "email" ? "opacity-100 visible translate-0" : "opacity-0 invisible absolute -translate-x-full"
            )}
    >
      <span className="absolute -top-8.75 left-1/2 -translate-x-1/2 flex items-center justify-center size-17.5 rounded-full bg-[#07b8d3] shrink-0">
        <PiPasswordDuotone className="size-10 text-white" />
      </span>
      <h1 className="text-xl font-bold text-center text-gray-500 capitalize">
        Mot de passe oublié
      </h1>
      <p className="text-center text-gray-500">
        Entrez votre email pour recevoir un code de vérification
      </p>
      <input
        type="email"
        placeholder="Email"
        className="text-base border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#27DAF5]"
      />
      <button
        onClick={() => {setContent("code")}}
        type="button"
        className="cursor-pointer text-base font-medium bg-[#07b8d3] text-white rounded-md px-4 py-2 hover:bg-[#1bb8d6] transition-colors"
      >
        ENVOYER
      </button>
    </form>
  );
};
