import { I18nProviderClient } from "@/locales/client";
import SessionProviderWrapper from "./SessionProviderWrapper";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body>
        <I18nProviderClient locale={locale}>
          <SessionProviderWrapper>{children}</SessionProviderWrapper>
        </I18nProviderClient>
      </body>
    </html>
  );
}
