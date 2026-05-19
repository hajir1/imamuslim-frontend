import { useEffect } from "react";
import { useCurrentQuran } from "../../state/TypeHooks";
import {
  JuzRoute,
  SurahRoute,
} from "../../components/layouts/alquran/RoutingQuran";
import MainLayouts from "../../components/layouts/Main";
import { useAllSurah } from "../../state/Query";

const AlQuranPage = () => {
  const { currentQuran }: any = useCurrentQuran();
  const { isLoading: surahLoading } = useAllSurah();
  const SekeletonArray = Array.from({ length: 30 }, (_, index) => index);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MainLayouts>
      <div className="w-full md:w-5/6">
        {/* if data loading... */}
        {surahLoading ? (
          <div className="w-full flex gap-2 p-2 mt-4 flex-col">
            <div className="w-full flex flex-wrap items-center flex-col gap-2 sm:flex-row sm:justify-center">
              {SekeletonArray.map((skleton: any) => (
                <div
                  key={skleton}
                  className="bg-gray-200 flex justify-center items-center h-20 max-w-[22rem] w-full rounded-md animate-pulse"
                >
                  <div className="w-12 h-12 rounded-md bg-gray-400 animate-pulse duration-200 transition-all ml-1"></div>
                  <div className="flex flex-col w-3/5 items-center gap-2 h-full justify-center">
                    <div className="w-11/12 h-4 bg-gray-400 animate-pulse duration-200 transition-all rounded-md"></div>
                    <div className="w-11/12 h-4 bg-gray-400 animate-pulse duration-200 transition-all rounded-md"></div>
                  </div>
                  <div className="flex flex-col w-2/5 items-center gap-2 h-full justify-center">
                    <div className="w-5/6 h-4 bg-gray-400 animate-pulse duration-200 transition-all rounded-md"></div>
                    <div className="w-5/6 h-4 bg-gray-400 animate-pulse duration-200 transition-all rounded-md"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center flex-wrap gap-2 w-full mt-4 p-2">
              {currentQuran === "Surah" ? <SurahRoute /> : <JuzRoute />}
            </div>
          </>
        )}
      </div>
    </MainLayouts>
  );
};

export default AlQuranPage;
