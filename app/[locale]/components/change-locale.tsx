
import { useChangeLocale, useCurrentLocale } from "@/locales/client";

export default function ChangeLocale() {
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  return (
    <select
      value={currentLocale}
      onChange={(e) => changeLocale(e.target.value as "en" | "fr")}
      className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="en">English</option>
      <option value="fr">Français</option>
    </select>
  );
}