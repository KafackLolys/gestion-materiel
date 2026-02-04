"use client";
import { TbPasswordMobilePhone } from "react-icons/tb";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../../../../components/ui/input-otp";
import {useFormStateStore} from "../stores/use-switch-store";
import { cn } from "../../../../../lib/utils";
export const CodeForm = () => {
  const { content, setContent } = useFormStateStore();
  return (
    <form
      action=""
      className={cn("relative px-10 pb-10 pt-12 bg-white rounded-md flex flex-col gap-5 shadow-md w-full max-w-md transition-all duration-500",
        content === "code" ? "opacity-100 visible translate-0" : "opacity-0 invisible fixed translate-x-full"
      )}
    >
      <span className="absolute -top-8.75 left-1/2 -translate-x-1/2 flex items-center justify-center size-17.5 rounded-full bg-[#07b8d3] shrink-0">
        <TbPasswordMobilePhone className="size-10 text-white" />
      </span>
      <h1 className="text-xl font-bold text-center text-gray-500 capitalize">
        Code OTP
      </h1>
      <p className="text-center text-gray-500">
        Entrez le code de vérification envoyé à <span className="text-[#07b8d3]">exemple_email@example.com</span>
      </p>
      <div className="flex justify-center">
        <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      </div>
      <button
        onClick={() => {setContent("new-password")}}
        type="button"
        className="cursor-pointer text-base font-medium bg-[#07b8d3] text-white rounded-md px-4 py-2 hover:bg-[#1bb8d6] transition-colors uppercase"
      >
        Vérifier
      </button>
      <p className="text-xs text-gray-500 text-center cursor-pointer" onClick={() => {setContent("email")}}>Modifier l'email</p>
    </form>
  );
};
