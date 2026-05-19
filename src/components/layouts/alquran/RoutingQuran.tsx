<<<<<<< HEAD
import { Link } from "react-router-dom";
import Border from "../../elements/Border";
import { useEffect, useState } from "react";
import { useAllSurah } from "../../../stores/Query";
import { useDarkmode } from "../../../stores/TypeHooks";
import { ChevronDown, ChevronUp } from "lucide-react";
=======
import Icon from "../../../helper/Icon";
import { Link } from "react-router-dom";
import Border from "../../element/Border";
import Viewicon from "../../element/Icon/Viewicon";
import { useEffect, useState } from "react";
import { useAllSurah } from "../../../state/Query";
import { useDarkmode } from "../../../state/TypeHooks";
>>>>>>> 17a45830acac7f2f8c1051fcd7c62e379e38a6a1

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

<<<<<<< HEAD
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
=======
export const SurahRoute = () => {
  const [tafsir, settafsir] = useState<any>();
  const darkMode = useDarkmode((state) => state.darkMode);
  const { data: dataSurah } = useAllSurah();
  const handleTafsir = (e: React.MouseEvent<SVGSVGElement>, id: number) => {
    e.preventDefault();
    const dataId = (dataSurah as any).data.filter(
      (surah: surahMap) => surah.number === id
    );
    if (dataId) {
      settafsir(dataId[0].number);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <>
      {(dataSurah as any)?.data?.map((surah: surahMap) => (
        <Link
          to={`/quran/surah/${surah.number}`}
          className={`${
            tafsir === surah?.number ? "h-96 lg:h-72" : "h-20"
          } w-full max-w-[22rem] outline-none border rounded-md relative transition-all duration-300 hover:border-2 hover:shadow-sm group `}
          key={surah?.number}
        >
          <div className="w-full h-20 flex items-center justify-evenly p-1  ">
            <Border number={surah.number} color="bg-primary" />
            <div className="flex flex-col w-3/5 items-center  h-full justify-center ">
              <h1 className="font-semibold">
                {surah?.name?.transliteration?.id}
              </h1>
              <p className={` text-center text-sm `}>
                {surah?.name?.translation?.id}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center w-2/5 h-full ">
              <p className="text-sm font-semibold text-center">
                {surah.revelation.id}
              </p>
              <p className={` text-xs`}>{surah.numberOfVerses} Ayat</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 ">
            {tafsir === surah.number ? (
              <Icon width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="m19 15l-7-6l-7 6"
                ></path>{" "}
              </Icon>
            ) : (
              <Viewicon
                fill={darkMode ? "white" : "black"}
                classIcon="w-[1rem]"
                handler={(e: React.MouseEvent<SVGSVGElement>) =>
                  handleTafsir(e, surah.number)
                }
              />
            )}
          </div>
          {tafsir === surah.number && (
            <div
              className={` absolute w-full h-72 overflow-y-auto lg:scroll-auto p-2 z-20 bottom-4 lg:h-52`}
            >
              <p className={`md:mt-6  text-sm`}>{surah?.tafsir?.id}</p>
            </div>
          )}{" "}
        </Link>
      ))}
    </>
  );
};

export const JuzRoute = () => {
  const NumberOfJuz: number[] = Array.from({ length: 30 }, (_, index) => index);
  return (
    <>
      {NumberOfJuz.map((index) => (
        <Link
          to={`/quran/juz/${index + 1}`}
          className={` w-full  max-w-[22rem] rounded-md h-20 border hover:border-2 flex items-center justify-center`}
          key={index}
        >
          <h1 className="text-center font-semibold text-3xl">
            Juz {index + 1}
          </h1>{" "}
>>>>>>> 17a45830acac7f2f8c1051fcd7c62e379e38a6a1
        </Link>
      ))}
    </>
  );
};
