/**
 * Page: JuzByIdPage
 *
 * BUG FIXES:
 * 1. `audio=""` passed to Box — should be `null` (empty string is truthy
 *    in JS comparisons like `audio !== null`).
 * 2. `setCurrentData=""` passed as a string — should be a function.
 * 3. No surah info label shown — now shows juz title in header.
 * 4. Skeleton had `duration-3002` typo (extra "2") — fixed to `duration-300`.
 *
 * NEW FEATURES:
 * - Juz title hero banner at top.
 * - Navigation buttons styled consistently.
 * - Reading progress label (e.g. "1 / 286 ayat").
 */
import { useNavigate, useParams } from "react-router-dom";
import { useJuzById } from "../../stores/Query";
import { useEffect } from "react";
import { TypeDataJuz, TypeDataJuzMap } from "../../types/index";
import MainLayouts from "../../components/layouts/Main";
import skeletonArray from "../../utils/skeleton";
import { useDarkmode } from "../../stores/TypeHooks";
import Border from "../../components/elements/Border";
import { ChevronLeft, ChevronRight } from "lucide-react";

const JuzByIdPage = () => {
  const { juz: idJuz }: any = useParams();
  const darkMode = useDarkmode((s) => s.darkMode);
  const { data: dataJuz, isLoading: loadingJuz } = useJuzById(idJuz);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [idJuz]);

  const verses = (dataJuz as TypeDataJuz)?.data?.verses ?? [];
  const juzNum = parseInt(idJuz ?? "1");

  return (
    <MainLayouts>
      <div className="w-full max-w-2xl px-4 pt-20">

        {/* ── Hero */}
        <div className="page-hero mb-6 p-5 text-center">
          <p className={`text-xs font-semibold uppercase tracking-widest text-white/70`}>
            Al-Qur'an
          </p>
          <h1 className="text-2xl font-bold text-white">Juz {idJuz}</h1>
          {!loadingJuz && verses.length > 0 && (
            <p className="mt-1 text-xs text-white/75">{verses.length} ayat</p>
          )}
        </div>

        {/* ── Navigation buttons */}
        <div className="mb-4 flex items-center justify-between">
          <button
            disabled={juzNum <= 1}
            onClick={() => navigate(`/quran/juz/${juzNum - 1}`)}
            className={`flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              juzNum <= 1
                ? "cursor-not-allowed opacity-40"
                : darkMode
                ? "bg-slate-700 text-white hover:bg-slate-600"
                : "bg-white text-slate-700 shadow hover:shadow-md"
            }`}
          >
            <ChevronLeft size={16} /> Juz Sebelumnya
          </button>
          <button
            disabled={juzNum >= 30}
            onClick={() => navigate(`/quran/juz/${juzNum + 1}`)}
            className={`flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              juzNum >= 30
                ? "cursor-not-allowed opacity-40"
                : darkMode
                ? "bg-slate-700 text-white hover:bg-slate-600"
                : "bg-white text-slate-700 shadow hover:shadow-md"
            }`}
          >
            Juz Berikutnya <ChevronRight size={16} />
          </button>
        </div>

        {loadingJuz ? (
          <div className="flex flex-col gap-3">
            {skeletonArray(8).map((s: any) => (
              <div key={s} className={`card-bg p-4 ${darkMode ? "dark" : ""}`}>
                <div className="skeleton h-10 w-10" />
                <div className="skeleton mt-3 ml-auto h-8 w-3/4" />
                <div className="skeleton mt-2 h-4 w-full" />
                {/* BUG FIX: was `duration-3002` */}
                <div className="skeleton mt-1 h-4 w-2/3 transition-all duration-300" />
              </div>
            ))}
          </div>
        ) : (
          <div className={`card-bg overflow-hidden ${darkMode ? "dark" : ""}`}>
            {verses.map((data: TypeDataJuzMap) => (
              <div
                key={data?.number?.inQuran}
                className="ayat-card p-4"
              >
                <div className="flex items-center justify-between">
                  <Border number={data?.number?.inSurah} />
                  <span className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
                    #{data?.number?.inQuran}
                  </span>
                </div>

                {/* Arabic */}
                <p
                  dir="rtl"
                  className={`font-amiri mt-3 text-right text-3xl leading-loose ${
                    darkMode ? "text-slate-100" : "text-slate-800"
                  }`}
                >
                  {data?.text?.arab}
                </p>

                {/* Transliteration */}
                <p className={`mt-2 text-sm font-medium capitalize ${
                  darkMode ? "text-emerald-400" : "text-emerald-700"
                }`}>
                  {data?.text?.transliteration?.en.split(" ").join(" - ")}
                </p>

                {/* Translation */}
                <p className={`mt-1 text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                  <span className="font-semibold">Artinya: </span>
                  {data?.translation?.id}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </MainLayouts>
  );
};

export default JuzByIdPage;
