import Icon from "../../../helper/Icon";
import { Link } from "react-router-dom";
// import { Sekeleton } from "../element/Sekeleton";
import Border from "../../element/Border";
import Viewicon from "../../element/Icon/Viewicon";
import { useEffect, useState } from "react";
import { useGetSurah } from "../../../state/Query";
import ErrorConn from "../../fragment/ErrorConn";
import { useDarkmode } from "../../../state/TypeHooks";
import { LoaderCircle } from "lucide-react";

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

export const SurahRoute = () => {
  const [tafsir, settafsir] = useState<any>();
  const darkMode = useDarkmode((state) => state.darkMode);
  const { data: dataSurah, isLoading: surahLoading } = useGetSurah();
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
      {surahLoading ? (
        <div className="w-full min-h-screen grid place-content-center">
          <LoaderCircle className="animate-spin  w-20 h-20" />
        </div>
      ) : (
        (dataSurah as any)?.data?.map((surah: surahMap) => (
          <Link
            to={`/quran/surah/${surah?.number}`}
            className={`${tafsir === surah?.number ? "h-96 lg:h-72" : "h-20"} ${
              darkMode ? "border-gray-100" : " border-slate-700"
            } w-full outline-none border rounded-md md:w-[47%] lg:w-[30%] relative transition-all duration-300 hover:border-2 hover:shadow-sm group `}
            key={surah?.number}
          >
            <div className="w-full h-20 flex items-center justify-evenly p-1  ">
              <Border
                numberClass={`${darkMode ? "text-white" : "text-slate-900"}`}
                number={surah.number}
                color="bg-primary"
              />
              <div className="flex flex-col w-[55%] items-center  h-full justify-center ">
                <h1 className="font-semibold">
                  {surah?.name?.transliteration?.id}
                </h1>
                <p className={` text-center text-sm `}>
                  {surah?.name?.translation?.id}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center w-[37%] h-full ">
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
                    fill=""
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
                <p className={`text-center  text-sm`}>{surah?.tafsir?.id}</p>
              </div>
            )}{" "}
          </Link>
        ))
      )}
    </>
  );
};

export const JuzRoute = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const skeletonArray: number[] = Array.from(
    { length: 30 },
    (_, index) => index
  );
  return (
    <>
      {skeletonArray.map((index) => (
        <Link
          to={`/quran/juz/${index + 1}`}
          className={`${
            darkMode ? "border-gray-100" : "border-slate-700 "
          } w-full  md:w-[47%] lg:w-[30%] rounded-md h-20 border hover:border-2 flex items-center justify-center`}
          key={index}
        >
          <h1 className="text-center font-semibold text-3xl">
            Juz {index + 1}
          </h1>{" "}
        </Link>
      ))}
    </>
  );
};
