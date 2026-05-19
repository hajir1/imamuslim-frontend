import { useEffect } from "react";
import { useDoaBySc, useScDoa } from "../stores/Query";
import MainLayouts from "../components/layouts/Main";
import skeletonArray from "../utils/skeleton";
import { useBookMarkDoa, useCurrentSc, useDarkmode } from "../stores/TypeHooks";
import { TypeDoa, TypeDoaMap, TypeSc } from "../types/index";
import LoveIcon from "../components/elements/Icon/LoveIcon";
import Border from "../components/elements/Border";
import { ChevronDown } from "lucide-react";

/**
 * Page: DoaPage
 * Browse and bookmark daily Islamic prayers by source category.
 */
const DoaPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const { data: dataSc }: any = useScDoa();

  const currentSc = useCurrentSc((s: any) => s.currentSc);
  const setCurrentSc = useCurrentSc((s: any) => s.setCurrentSc);

  const { data: dataDoas, isLoading: isLoadingDoa } = useDoaBySc(currentSc);

  const bookMark = useBookMarkDoa((s: any) => s.bookMark);
  const addBookMark = useBookMarkDoa((s: any) => s.addBookMark);
  const deleteBookMark = useBookMarkDoa((s: any) => s.deleteBookMark);

  /** Toggle bookmark for a specific doa */
  const onHandleBookMark = (props: TypeDoaMap) => {
    const exists = bookMark.some((item: any) => item.judul === props.judul);
    if (exists) {
      deleteBookMark(props.judul);
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
          <p className="font-amiri mb-1 text-2xl text-white">اَللّٰهُمَّ</p>
          <h1 className="text-lg font-bold text-white">Kumpulan Doa</h1>
          <p className="mt-1 text-xs text-white/75">Doa harian dari berbagai sumber</p>
        </div>

        {/* Source selector */}
        <div className={`card-bg mb-4 p-3 ${darkMode ? "dark" : ""}`}>
          <label className={`mb-1.5 block text-xs font-semibold uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
            Pilih Sumber Doa
          </label>
          <div className="relative">
            <select
              value={currentSc}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCurrentSc(e.target.value)}
              className={`input-bg w-full appearance-none px-4 py-2.5 pr-10 text-sm ${darkMode ? "dark" : ""}`}
            >
              <option value="" disabled>Pilih kategori doa...</option>
              {(dataSc as TypeSc)?.data.map((sc: string) => (
                <option value={sc} key={sc}>{sc.charAt(0).toUpperCase() + sc.slice(1)}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? "text-slate-400" : "text-slate-400"}`}
            />
          </div>
        </div>

        {/* Doa list */}
        {isLoadingDoa ? (
          <div className="flex flex-col gap-3">
            {skeletonArray(6).map((s: number) => (
              <div key={s} className={`card-bg p-4 ${darkMode ? "dark" : ""}`}>
                <div className="skeleton h-4 w-40" />
                <div className="skeleton mt-3 ml-auto h-10 w-3/4" />
                <div className="skeleton mt-2 h-3 w-full" />
                <div className="skeleton mt-1 h-3 w-5/6" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 fade-in">
            {(dataDoas as TypeDoa)?.data?.map((doa: TypeDoaMap, index: number) => {
              const isBookmarked = bookMark.some((bm: TypeDoaMap) => bm.judul === doa.judul);
              return (
                <div
                  key={doa.judul}
                  className={`card-bg p-4 ${darkMode ? "dark" : ""}`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Border number={index + 1} />
                      <h2 className={`text-sm font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>
                        {doa.judul}
                      </h2>
                    </div>
                    <button
                      onClick={() => onHandleBookMark(doa)}
                      aria-label="Bookmark doa"
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
                    className={`font-amiri mt-3 text-right text-2xl leading-loose ${
                      darkMode ? "text-emerald-300" : "text-emerald-700"
                    }`}
                  >
                    {doa.arab}
                  </p>

                  {/* Translation */}
                  <p className={`mt-3 text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                    <span className="font-semibold">Artinya: </span>
                    {doa.artinya}
                  </p>

                  {/* Source */}
                  <p className={`mt-2 text-[10px] ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                    Sumber: {doa.sumber}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayouts>
  );
};

export default DoaPage;
