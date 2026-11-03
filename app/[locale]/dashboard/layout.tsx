import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // ❌ pas connecté → redirection login
  if (!session) {
    redirect("/login");
  }

  // ✅ connecté → accès autorisé
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}
