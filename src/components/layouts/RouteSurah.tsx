import Icon from "../../helper/Icon";
import { Link } from "react-router-dom";
import {Sekeleton} from "../element/Sekeleton";
import Border from "../element/Border";
import Viewicon from "../element/Icon/Viewicon";
import { useEffect, useState } from "react";
import { useGetAlQuranSurah } from "../../state/Query";
import ErrorConn from "../fragment/ErrorConn";
import { useDarkmode } from "../../state/Zustand";
import { AlQuranSurahDatamap } from "../../model/Interface";

export const SurahRoute = () => {
  const [tafsir, settafsir] = useState<any>();
  const darkMode = useDarkmode((state) => state.darkMode);
  const { data: dataSurah, isError } = useGetAlQuranSurah();
  const skeletonArray: any = Array.from({ length: 20 }, (_, index) => index);
  const handleTafsir = (e: React.MouseEvent<SVGSVGElement>, id: number) => {
    e.preventDefault();
    const dataId = (dataSurah as any).data.filter(
      (item: AlQuranSurahDatamap) => item.number === id
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
      {(dataSurah as any)?.data?.length > 0 ? (
        (dataSurah as any)?.data?.map((item: AlQuranSurahDatamap) => (
          <Link
            to={`/quran/surah/${item?.number}`}
            className={`${tafsir === item?.number ? "h-96 lg:h-72" : "h-20"} ${
              darkMode ? "border-white" : " border-primary"
            } w-full outline-none border rounded-md md:w-[47%] lg:w-[30%] relative hover:border-[2px] transition-all duration-300 hover:shadow-primary hover:shadow-sm group `}
            key={item?.number}
          >
            <div className="w-full h-20 flex items-center justify-evenly p-1  ">
              <Border
                numberClass={`${darkMode ? "text-white" : "text-slate-600"}`}
                number={item.number}
                border="border-primary"
              />
              <div className="flex flex-col w-[55%] items-center  h-full justify-center ">
                <h1 className="font-bold">{item?.name?.transliteration?.id}</h1>
                <p
                  className={`${
                    darkMode ? "text-white" : "text-slate-600"
                  } text-center text-sm `}
                >
                  {item?.name?.translation?.id}
                </p>
              </div>
              <div className="flex flex-col items-center justify-center w-[37%] h-full ">
                <p className="font-semibold text-base text-center">
                  {item?.name?.long}
                </p>
                <p
                  className={`${
                    darkMode ? "text-white" : "text-slate-600"
                  } text-sm `}
                >
                  {item.numberOfVerses} / {item.revelation.id}
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 ">
              {tafsir === item.number ? (
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
                    handleTafsir(e, item.number)
                  }
                />
              )}
            </div>
            {tafsir === item.number && (
              <div
                className={` absolute w-full h-72 overflow-y-auto lg:scroll-auto p-2 z-20 bottom-4 lg:h-52`}
              >
                <p
                  className={`${
                    darkMode ? "text-white" : "text-slate-600"
                  } text-center  text-sm`}
                >
                  {item?.tafsir?.id}
                </p>
              </div>
            )}{" "}
          </Link>
        ))
      ) : (
        <div className="flex justify-center flex-wrap gap-2 w-full">
          {skeletonArray?.map((item: any) => (
            <Sekeleton custom="lg:w-30 h-20" key={item} />
          ))}
        </div>
      )}
      {isError && <ErrorConn />}
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
    <div className="w-full flex flex-col gap-4">
      {skeletonArray.map((item) => (
        <Link
          to={`/quran/juz/${item + 1}`}
          className={`${
            darkMode ? "border-white" : "border-primary "
          } w-full h-20 border flex items-center justify-center`}
          key={item}
        >
          <h1 className="text-center font-semibold text-3xl">Juz {item + 1}</h1>{" "}
        </Link>
      ))}
    </div>
  );
};
