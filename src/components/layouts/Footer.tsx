import { getDate, getYears, getMonthIdn } from "../../utils/moment";
import { useDarkmode } from "../../stores/TypeHooks";
import { BookOpen } from "lucide-react";

/**
 * Component: Footer
 * Clean minimal footer with branding.
 */
const Footer = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <footer
      className={`mt-4 w-full border-t py-6 ${
        darkMode
          ? "border-slate-700 bg-slate-900 text-slate-400"
          : "border-slate-100 bg-white text-slate-500"
      }`}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 text-center">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500">
            <BookOpen size={12} className="text-white" />
          </div>
          <span className={`text-sm font-semibold ${darkMode ? "text-white" : "text-slate-700"}`}>
            Im'a Muslim
          </span>
        </div>
        <p className="text-xs">
          &copy; {getDate}-{getMonthIdn}-{getYears} · All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
