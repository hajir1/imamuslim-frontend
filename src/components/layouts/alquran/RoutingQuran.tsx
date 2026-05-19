import { Link } from "react-router-dom";
import Border from "../../elements/Border";
import { useEffect, useState } from "react";
import { useAllSurah } from "../../../stores/Query";
import { useDarkmode } from "../../../stores/TypeHooks";
import { ChevronDown, ChevronUp } from "lucide-react";

export type surahMap = {
  number: number;
  name: {
    translation: { id: string; en: string };
    transliteration: { id: string; en: string };
    long: string;
    short: string;
  };
  numberOfVerses: number;
  revelation: { id: number };
  tafsir: { id: string };
};

/**
 * Component: SurahRoute
 * Grid of all 114 surahs with expandable tafsir preview.
 */
export const SurahRoute = () => {
  const [tafsir, setTafsir] = useState<any>();
  const darkMode = useDarkmode((state) => state.darkMode);
  const { data: dataSurah } = useAllSurah();

  const handleTafsir = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    setTafsir(tafsir === id ? null : id);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      {(dataSurah as any)?.data?.map((surah: surahMap) => (
        <div
          key={surah.number}
          className={`card-bg w-full max-w-[22rem] overflow-hidden transition-all duration-300 ${
            tafsir === surah.number ? "ring-2 ring-emerald-400" : ""
          } ${darkMode ? "dark" : ""}`}
        >
          <Link to={`/quran/surah/${surah.number}`} className="flex items-center gap-3 p-3">
            <Border number={surah.number} />
            <div className="min-w-0 flex-1">
              <p className={`truncate text-sm font-semibold ${darkMode ? "text-white" : "text-slate-800"}`}>
                {surah.name.transliteration.id}
              </p>
              <p className={`truncate text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {surah.name.translation.id}
              </p>
            </div>
            <div className="text-right">
              <span className={`badge ${surah.revelation.id === 1 ? "badge-green" : "badge-blue"}`}>
                {surah.revelation.id === 1 ? "Makkah" : "Madinah"}
              </span>
              <p className={`mt-1 text-xs ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {surah.numberOfVerses} ayat
              </p>
            </div>
          </Link>

          {/* Tafsir toggle */}
          <button
            onClick={(e) => handleTafsir(e, surah.number)}
            className={`flex w-full items-center justify-center gap-1 border-t py-1.5 text-xs font-medium transition-colors ${
              darkMode
                ? "border-slate-700 text-slate-400 hover:bg-slate-700"
                : "border-slate-100 text-slate-400 hover:bg-slate-50"
            }`}
          >
            {tafsir === surah.number ? (
              <>Sembunyikan Tafsir <ChevronUp size={12} /></>
            ) : (
              <>Lihat Tafsir <ChevronDown size={12} /></>
            )}
          </button>

          {/* Tafsir panel */}
          {tafsir === surah.number && (
            <div className={`p-3 pt-0 text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
              {surah.tafsir.id}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

/**
 * Component: JuzRoute
 * Grid of 30 Juz cards.
 */
export const JuzRoute = () => {
  const darkMode = useDarkmode((s) => s.darkMode);
  const NumberOfJuz: number[] = Array.from({ length: 30 }, (_, i) => i);

  return (
    <>
      {NumberOfJuz.map((index) => (
        <Link
          to={`/quran/juz/${index + 1}`}
          key={index}
          className={`card-bg flex h-24 w-full max-w-[22rem] flex-col items-center justify-center gap-1 ${darkMode ? "dark" : ""}`}
        >
          <span className={`text-xs font-medium uppercase tracking-widest ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
            Juz
          </span>
          <span className={`text-3xl font-bold ${darkMode ? "text-white" : "text-slate-800"}`}>
            {index + 1}
          </span>
        </Link>
      ))}
    </>
  );
};
