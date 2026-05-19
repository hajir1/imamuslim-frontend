import { useEffect } from "react";
import Border from "../components/elements/Border";
import LoveIcon from "../components/elements/Icon/LoveIcon";
import { TypeAsmaulHusna, TypeAsmaulHusnaMap } from "../types/index";
import { useAsmaulHusna } from "../stores/Query";
import { useBookMarkAsmaulHusna, useDarkmode } from "../stores/TypeHooks";
import MainLayouts from "../components/layouts/Main";
import skeletonArray from "../utils/skeleton";

/**
 * Page: AsmaulHusnaPage
 * Displays 99 names of Allah with bookmark functionality.
 */
const AsmaulHusnaPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const { data: dataAsmaulHusna, isLoading: loadingAsmaulHusna } = useAsmaulHusna();

  const bookMark = useBookMarkAsmaulHusna((s: any) => s.bookMark);
  const addBookMark = useBookMarkAsmaulHusna((s: any) => s.addBookMark);
  const deleteBookMark = useBookMarkAsmaulHusna((s: any) => s.deleteBookMark);

  /** Toggle bookmark for a given Asmaul Husna item */
  const onHandleBookMark = (props: TypeAsmaulHusnaMap) => {
    const exists = bookMark.some((item: TypeAsmaulHusnaMap) => item.id === props.id);
    if (exists) {
      deleteBookMark(props.id);
    } else {
      addBookMark(props);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayouts>
      <div className="w-full max-w-2xl px-4">
        {/* Hero */}
        <div className="page-hero mb-6 p-5 text-center">
          <p className="font-amiri mb-1 text-2xl text-white">أسماء الله الحسنى</p>
          <h1 className="text-lg font-bold text-white">99 Asmaul Husna</h1>
          <p className="mt-1 text-xs text-white/75">99 Nama Allah beserta makna & artinya</p>
        </div>

        {/* Content */}
        {loadingAsmaulHusna ? (
          <div className="flex flex-col gap-3">
            {skeletonArray(10).map((s: number) => (
              <div key={s} className={`card-bg p-4 ${darkMode ? "dark" : ""}`}>
                <div className="flex items-center justify-between">
                  <div className="skeleton h-10 w-10" />
                  <div className="skeleton h-6 w-6" />
                </div>
                <div className="skeleton mt-3 ml-auto h-8 w-40" />
                <div className="skeleton mt-2 h-4 w-28" />
                <div className="skeleton mt-1 h-4 w-52" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2 fade-in">
            {(dataAsmaulHusna as TypeAsmaulHusna)?.data?.map(
              (item: TypeAsmaulHusnaMap) => {
                const isBookmarked = bookMark.some(
                  (bm: TypeAsmaulHusnaMap) => bm.id === item.id
                );
                return (
                  <div
                    key={item.id}
                    className={`card-bg p-4 ${darkMode ? "dark" : ""}`}
                  >
                    {/* Header row */}
                    <div className="flex items-center justify-between">
                      <Border number={item.id} />
                      <button
                        onClick={() => onHandleBookMark(item)}
                        aria-label="Bookmark"
                        className="rounded-full p-1.5 transition-colors hover:bg-rose-50"
                      >
                        <LoveIcon
                          fill={isBookmarked ? "#f43f5e" : "none"}
                          stroke={isBookmarked ? "#f43f5e" : darkMode ? "#94a3b8" : "#cbd5e1"}
                          onClick={() => {}}
                        />
                      </button>
                    </div>

                    {/* Arabic */}
                    <p
                      dir="rtl"
                      className={`font-amiri mt-2 text-right text-3xl leading-relaxed ${
                        darkMode ? "text-emerald-300" : "text-emerald-700"
                      }`}
                    >
                      {item.arab}
                    </p>

                    {/* Latin */}
                    <p className={`mt-1 text-sm font-semibold capitalize ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
                      {item.latin}
                    </p>

                    {/* Translation */}
                    <p className={`mt-0.5 text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                      <span className="font-semibold">Artinya: </span>
                      {item.indo}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </MainLayouts>
  );
};

export default AsmaulHusnaPage;
