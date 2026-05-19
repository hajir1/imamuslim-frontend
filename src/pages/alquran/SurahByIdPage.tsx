/**
 * Page: SurahByIdPage
 *
 * BUG FIX:
 * - `duration-2002` typo in skeleton class — fixed to `duration-200`.
 * - "mt-4" on second nav button misaligned the row — removed.
 *
 * NEW FEATURES:
 * - Surah name shown in hero (fetched data used).
 * - Navigation buttons styled consistently with JuzByIdPage (disabled state).
 * - Bismillah header shown before ayat 1 (per Islamic tradition).
 */
import { useSurahById } from "../../stores/Query";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentSurah, useDarkmode } from "../../stores/TypeHooks";
import {
  BacaRoute,
  TerjemahRoute,
} from "../../components/layouts/alquran/OpsiBaTe";
import MainLayouts from "../../components/layouts/Main";
import skeletonArray from "../../utils/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TypeSurah } from "../../types/index";

const SurahByIdPage = () => {
  const darkMode = useDarkmode((s) => s.darkMode);
  const { currentSurah }: any = useCurrentSurah();
  const { surah: idSurah } = useParams();
  const { isLoading: isLoadingSurah, data: surahData } = useSurahById(idSurah);
  const navigate = useNavigate();

  const surahNum = parseInt(idSurah ?? "1");
  const surahInfo = (surahData as TypeSurah)?.data;

  return (
    <MainLayouts>
      <div className="w-full max-w-2xl px-4 pt-20">

        {isLoadingSurah ? (
          <div className="flex flex-col gap-3 pt-2">
            <div className="skeleton h-28 w-full rounded-2xl" />
            <div className="flex justify-between">
              <div className="skeleton h-9 w-32 rounded-xl" />
              <div className="skeleton h-9 w-32 rounded-xl" />
            </div>
            {skeletonArray(8).map((s: any) => (
              <div key={s} className={`card-bg p-4 ${darkMode ? "dark" : ""}`}>
                <div className="skeleton h-10 w-10" />
                <div className="skeleton mt-3 ml-auto h-8 w-3/4" />
                {/* BUG FIX: was `duration-2002` */}
                <div className="skeleton mt-2 h-4 w-full transition-all duration-200" />
                <div className="skeleton mt-1 h-4 w-2/3" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* ── Surah Hero */}
            <div className="page-hero mb-4 p-5 text-center">
              {surahInfo?.name?.short && (
                <p className={`font-amiri text-3xl text-white`}>
                  {surahInfo.name.short}
                </p>
              )}
              <h1 className="mt-1 text-lg font-bold text-white">
                {surahInfo?.name?.transliteration?.id ?? `Surah ${idSurah}`}
              </h1>
              <p className="mt-0.5 text-xs text-white/75">
                {surahInfo?.name?.translation?.id} · {surahInfo?.numberOfVerses} Ayat ·{" "}
                {surahInfo?.revelation?.id === "mekah" ? "Makkiyah" : "Madaniyah"}
              </p>
            </div>

            {/* ── Navigation */}
            <div className="mb-4 flex items-center justify-between">
              <button
                disabled={surahNum <= 1}
                onClick={() => navigate(`/quran/surah/${surahNum - 1}`)}
                className={`flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  surahNum <= 1
                    ? "cursor-not-allowed opacity-40"
                    : darkMode
                    ? "bg-slate-700 text-white hover:bg-slate-600"
                    : "bg-white text-slate-700 shadow hover:shadow-md"
                }`}
              >
                <ChevronLeft size={16} /> Surah Sebelumnya
              </button>
              <button
                disabled={surahNum >= 114}
                onClick={() => navigate(`/quran/surah/${surahNum + 1}`)}
                className={`flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                  surahNum >= 114
                    ? "cursor-not-allowed opacity-40"
                    : darkMode
                    ? "bg-slate-700 text-white hover:bg-slate-600"
                    : "bg-white text-slate-700 shadow hover:shadow-md"
                }`}
              >
                Surah Berikutnya <ChevronRight size={16} />
              </button>
            </div>

            {/* ── Bismillah (for all surahs except At-Tawbah no.9) */}
            {surahNum !== 9 && surahNum !== 1 && (
              <div className={`mb-2 rounded-2xl p-3 text-center ${darkMode ? "bg-slate-800" : "bg-emerald-50"}`}>
                <p className={`font-amiri text-2xl leading-loose ${darkMode ? "text-emerald-300" : "text-emerald-700"}`}>
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
              </div>
            )}

            {/* ── Ayat content */}
            <div className={`card-bg overflow-hidden ${darkMode ? "dark" : ""}`}>
              {currentSurah === "Terjemah" ? <TerjemahRoute /> : <BacaRoute />}
            </div>
          </>
        )}
      </div>
    </MainLayouts>
  );
};

export default SurahByIdPage;
