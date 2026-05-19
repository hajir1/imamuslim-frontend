import { Link, useLocation, useParams } from "react-router-dom";
import {
  useCurrentQuran,
  useCurrentSurah,
  useDarkmode,
} from "../../stores/TypeHooks";
import { Moon, Sun, BookOpen } from "lucide-react";
import { BreadCrumb } from "../fragments/Breadcrumb";

/** Map path to page label */
const PAGE_LABELS: Record<string, { label: string; emoji: string }> = {
  quran: { label: "Al-Quran", emoji: "📖" },
  asmaulhusna: { label: "Asmaul Husna", emoji: "✨" },
  doa: { label: "Doa-Doa", emoji: "🤲" },
  jadwalsholat: { label: "Jadwal Sholat", emoji: "🕌" },
  hadist: { label: "Hadist", emoji: "📜" },
};

/**
 * Component: Navbar
 * Responsive sticky top navigation with dark mode toggle, breadcrumb, and page title.
 */
const Navbar = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const setDarkMode = useDarkmode((state) => state.setDarkMode);

  /** Toggle theme */
  const handleToggleDark = () => setDarkMode(!darkMode);

  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const path = segments[0];
  const subPath = segments[1];

  const { surah: idSurah, juz: idJuz } = useParams();

  const currentQuran = useCurrentQuran((s: any) => s.currentQuran);
  const setCurrentQuran = useCurrentQuran((s: any) => s.setCurrentQuran);
  const currentSurah = useCurrentSurah((s: any) => s.currentSurah);
  const setCurrentSurah = useCurrentSurah((s: any) => s.setCurrentSurah);

  const pageInfo = path ? PAGE_LABELS[path] : null;

  return (
    <div className={`fixed top-0 z-30 w-full navbar-bg ${darkMode ? "dark" : ""}`}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">

        {/* ── Left: Brand / Page title */}
        <div className="flex items-center gap-3">
          {!path ? (
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md">
                <BookOpen size={18} className="text-white" />
              </div>
              <span className={`text-lg font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-800"}`}>
                Im'a Muslim
              </span>
            </Link>
          ) : (
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-md">
                <BookOpen size={18} className="text-white" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className={`text-[10px] font-medium uppercase tracking-widest ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
                  Im'a Muslim
                </span>
                {pageInfo && (
                  <span className={`text-sm font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>
                    {pageInfo.emoji} {pageInfo.label}
                  </span>
                )}
              </div>
            </Link>
          )}
        </div>

        {/* ── Right: Dark mode toggle */}
        <button
          onClick={handleToggleDark}
          aria-label="Toggle dark mode"
          className={`relative flex h-9 w-16 items-center rounded-full p-1 transition-all duration-300 ${
            darkMode
              ? "bg-slate-700 shadow-inner"
              : "bg-slate-100 shadow-inner"
          }`}
        >
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full shadow-md transition-all duration-300 ${
              darkMode
                ? "translate-x-7 bg-slate-900 text-yellow-400"
                : "translate-x-0 bg-white text-yellow-500"
            }`}
          >
            {darkMode ? <Moon size={14} /> : <Sun size={14} />}
          </span>
        </button>
      </div>

      {/* ── Breadcrumb bar */}
      {path === "quran" && subPath !== "surah" && subPath !== "juz" && (
        <div className={`border-t px-4 pb-1 ${darkMode ? "border-slate-700" : "border-slate-100"}`}>
          <BreadCrumb
            firstRoute="al-Quran"
            firstRouteLink="/"
            routeStatus1="Surah"
            routeStatus2="Juz"
            option={currentQuran}
            setOption={setCurrentQuran}
          />
        </div>
      )}
      {subPath === "surah" && (
        <div className={`border-t px-4 pb-1 ${darkMode ? "border-slate-700" : "border-slate-100"}`}>
          <BreadCrumb
            firstRoute={`Surah ke ${idSurah}`}
            firstRouteLink="/quran"
            routeStatus1="Terjemah"
            routeStatus2="Baca"
            option={currentSurah}
            setOption={setCurrentSurah}
          />
        </div>
      )}
      {subPath === "juz" && (
        <div className={`border-t px-4 pb-1 ${darkMode ? "border-slate-700" : "border-slate-100"}`}>
          <BreadCrumb
            firstRoute={`Juz ke ${idJuz}`}
            firstRouteLink="/quran"
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
