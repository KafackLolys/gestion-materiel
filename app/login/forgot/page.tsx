import { CodeForm } from "./_components/code-form";
import { EmailForm } from "./_components/email-form";
import { NewPasswordForm } from "./_components/new-password-form";


export default function ForgotPage() {
  return (
    <div className="min-h-screen w-full bg-[#EDEDED] flex items-center justify-center">
      <div className="h-full w-full flex items-center justify-center container container-padding">
        <EmailForm />
        <CodeForm />
        <NewPasswordForm />
      </div>
    </div>
  );
}