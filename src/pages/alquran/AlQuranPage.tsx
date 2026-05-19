import { useEffect } from "react";
import { useCurrentQuran } from "../../stores/TypeHooks";
import {
  JuzRoute,
  SurahRoute,
} from "../../components/layouts/alquran/RoutingQuran";
import MainLayouts from "../../components/layouts/Main";
import { useAllSurah } from "../../stores/Query";
import skeletonArray from "../../utils/skeleton";

/**
 * Component/Function  Al Quran Page.
 * Used to render or handle logic for AlQuranPage.
 */
const AlQuranPage = () => {
  const { currentQuran }: any = useCurrentQuran();
  const { isLoading: surahLoading } = useAllSurah();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MainLayouts>
      <div className=" w-full md:w-5/6">
        {/* if data loading... */}
        {surahLoading ? (
          <div className="mt-4 flex w-full flex-col gap-2 p-2">
            <div className="flex w-full flex-col flex-wrap items-center gap-2 sm:flex-row sm:justify-center">
              {skeletonArray(30).map((skleton: any) => (
                <div
                  key={skleton}
                  className="flex h-20 w-full max-w-[22rem] animate-pulse items-center justify-center rounded-md bg-gray-200"
                >
                  <div className="ml-1 h-12 w-12 animate-pulse rounded-md bg-gray-400 transition-all duration-200"></div>
                  <div className="flex h-full w-3/5 flex-col items-center justify-center gap-2">
                    <div className="h-4 w-11/12 animate-pulse rounded-md bg-gray-400 transition-all duration-200"></div>
                    <div className="h-4 w-11/12 animate-pulse rounded-md bg-gray-400 transition-all duration-200"></div>
                  </div>
                  <div className="flex h-full w-2/5 flex-col items-center justify-center gap-2">
                    <div className="h-4 w-5/6 animate-pulse rounded-md bg-gray-400 transition-all duration-200"></div>
                    <div className="h-4 w-5/6 animate-pulse rounded-md bg-gray-400 transition-all duration-200"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="mt-4 flex w-full flex-wrap justify-center gap-2 p-2">
              {currentQuran === "Surah" ? <SurahRoute /> : <JuzRoute />}
            </div>
          </>
        )}
      </div>
    </MainLayouts>
  );
};

export default AlQuranPage;
