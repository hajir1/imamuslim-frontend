import { useEffect } from "react";
import { useAlQuranOption } from "../../state/TypeHooks";
import { BreadCrumbV1 } from "../../components/fragment/Breadcrumb";
import {
  JuzRoute,
  SurahRoute,
} from "../../components/layouts/alquran/RoutingQuran";
import MainLayouts from "../../components/layouts/Main";
import { useGetSurah } from "../../state/Query";

const AlQuranPage = () => {
  const { alQuranOption, setAlquranOption }: any = useAlQuranOption();
  const { isLoading: surahLoading } = useGetSurah();
  const SekeletonArray = Array.from({ length: 30 }, (_, index) => index);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MainLayouts navbarType={"quran"}>
      <div className="w-full">
        {surahLoading ? (
          <div className="w-full flex gap-2 flex-col p-2">
            <div className="flex-shrink-0 flex justify-start gap-2">
              <div className="ml-4 bg-gray-200 h-8 w-16 sm:w-20 md:w-28 rounded-md animate-pulse"></div>
              <div className="bg-gray-200 h-8 w-16 sm:w-20 md:w-28 rounded-md animate-pulse"></div>
              <div className="bg-gray-200 h-8 w-16 sm:w-20 md:w-28 rounded-md animate-pulse"></div>
            </div>
            <div className="w-full flex flex-wrap flex-col p-2 gap-2 sm:flex-row sm:justify-center">
              {SekeletonArray.map((skleton: any) => (
                <div
                  key={skleton}
                  className="bg-gray-200 h-20 sm:w-[48%] md:w-[30%] w-full rounded-md animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <BreadCrumbV1
            firstRoute={"al-Quran"}
            routeOption1="Surah"
            routeOption2="Juz"
            setOption={setAlquranOption}
            option={alQuranOption}
          />
        )}
      </div>
      <div className="flex justify-center flex-wrap gap-2 p-2 w-full">
        {alQuranOption === "Surah" ? <SurahRoute /> : <JuzRoute />}
      </div>
    </MainLayouts>
  );
};

export default AlQuranPage;
