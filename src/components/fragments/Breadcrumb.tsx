import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { Home, ChevronRight } from "lucide-react";
import { useDarkmode } from "../../stores/TypeHooks";

type TypeBreadCrumb = {
  firstRoute: string;
  firstRouteLink: string;
  secondRoute?: string;
  thirdRoute?: string;
  option?: string | Dispatch<SetStateAction<string>>;
  setOption?: (param: string | undefined) => void;
  routeStatus1?: string;
  routeStatus2?: string;
};

/**
 * Component: BreadCrumb
 * Responsive breadcrumb with optional toggle between two route states.
 */
export const BreadCrumb = ({
  firstRoute,
  firstRouteLink,
  setOption,
  option,
  routeStatus1,
  routeStatus2,
}: TypeBreadCrumb) => {
  const darkMode = useDarkmode((s) => s.darkMode);
  return (
    <nav className="flex items-center gap-1 py-1.5" aria-label="Breadcrumb">
      {/* Home */}
      <Link
        to="/"
        className={`flex items-center gap-1 text-xs font-medium transition-colors ${
          darkMode
            ? "text-slate-400 hover:text-emerald-400"
            : "text-slate-500 hover:text-emerald-600"
        }`}
      >
        <Home size={13} />
        <span>Home</span>
      </Link>

      <ChevronRight size={12} className={darkMode ? "text-slate-600" : "text-slate-300"} />

      {/* First route */}
      <Link
        to={firstRouteLink}
        className={`text-xs font-medium transition-colors ${
          darkMode
            ? "text-slate-300 hover:text-emerald-400"
            : "text-slate-600 hover:text-emerald-600"
        }`}
      >
        {firstRoute}
      </Link>

      {/* Toggle option (e.g. Surah / Juz or Terjemah / Baca) */}
      {option && routeStatus1 && routeStatus2 && (
        <>
          <ChevronRight size={12} className={darkMode ? "text-slate-600" : "text-slate-300"} />
          <button
            onClick={() => {
              if (option === routeStatus1) {
                if (setOption) setOption(routeStatus2);
              } else {
                if (setOption) setOption(routeStatus1);
              }
            }}
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all ${
              darkMode
                ? "bg-emerald-900 text-emerald-300 hover:bg-emerald-800"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            {option === routeStatus1 ? routeStatus1 : routeStatus2}
            <span className={`ml-1 opacity-50`}>
              → {option === routeStatus1 ? routeStatus2 : routeStatus1}
            </span>
          </button>
        </>
      )}
    </nav>
  );
};
