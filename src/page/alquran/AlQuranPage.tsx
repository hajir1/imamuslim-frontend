import { useEffect, } from "react";
import Navbar from "../../components/layouts/Navbar";
import { useDarkmode, useOpsiSurahJuz } from "../../state/Zustand";
import Terjemahicon from "../../components/element/Icon/Terjemahicon";
import BacaIcon from "../../components/element/Icon/BacaIcon";
import {
  JuzRoute,
  SurahRoute,
} from "../../components/layouts/alquran/RoutingQuran";
import { useGetAlQuranSurah } from "../../state/Query";
import { Sekeleton } from "../../components/element/Sekeleton";

const AlQuranPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const skeletonArray: any = Array.from({ length: 20 }, (_, index) => index);
  const { juz, setJuz }: any = useOpsiSurahJuz();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { isLoading } = useGetAlQuranSurah();
  return (
    <div
      className={`${
        darkMode && "bg-black text-white"
      } flex flex-col items-center`}
    >
      <Navbar type="quran" />
      <div className="mt-20 w-full flex items-center flex-col">
        {isLoading ? (
          <div className="w-full flex flex-col justify-evenly mt-4 p-2">
            <div className="flex w-full justify-evenly">
              {" "}
              <div className="outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-10 my-2 w-32"></div>
              <div className="outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-10 my-2 w-32"></div>
            </div>
            <div className="flex justify-center flex-wrap gap-2 w-full">
              {skeletonArray?.map((item: any) => (
                <Sekeleton custom="lg:w-30 h-20" key={item} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center flex-wrap gap-2 p-2 w-full">
            <div className="w-full flex justify-evenly mt-4 p-2">
              <button
                onClick={() => setJuz(false)}
                className={`${!juz && "border-b-2 border-b-black"} ${
                  darkMode ? "text-white border-b-white" : "text-gray-800"
                } font-bold py-2 px-4 rounded inline-flex items-center`}
              >
                <Terjemahicon />
                <span className="mx-2">Surah</span>
              </button>
              <button
                onClick={() => setJuz(true)}
                className={`${juz && "border-b-2 border-b-black"} ${
                  darkMode ? "text-white border-b-white" : "text-gray-800"
                } font-bold py-2 px-4 rounded inline-flex items-center`}
              >
                <BacaIcon width="1.6rem" height="1.6rem" />
                <span className="mx-2">Juz</span>
              </button>
            </div>
            {!juz ? <SurahRoute /> : <JuzRoute />}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlQuranPage;
