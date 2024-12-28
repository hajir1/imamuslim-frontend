import React, { useState } from "react";
import { useGetSurahById } from "../../state/Query";
import { useNavigate, useParams } from "react-router-dom";
import { useAudioActive } from "../../state/TypeHooks";
import {
  BacaRoute,
  TerjemahRoute,
} from "../../components/layouts/alquran/OpsiBaTe";
import { BreadCrumbV1 } from "../../components/fragment/Breadcrumb";
import { LoaderCircle } from "lucide-react";
import MainLayouts from "../../components/layouts/Main";
import { TypeDataSurahById } from "../../model/Interface";

const SurahByIdPage = () => {
  const { audioActive } = useAudioActive();
  const [optionSurah, setOptionSurah] = useState<
    string | React.Dispatch<React.SetStateAction<string>>
  >("Terjemah");
  const { surah: idSurahPage }: any = useParams();
  const { data: dataSurah, isLoading: isLoadingSurah } =
    useGetSurahById(idSurahPage);
  const navigate = useNavigate();
  const SekeletonArray = Array.from({ length: 30 }, (_, index) => index);

  return (
    <MainLayouts navbarType={"quran"}>
      {isLoadingSurah ? (
        <div className="w-full flex gap-2 flex-col p-2 md:w-5/6">
          <div className="md:ml-6 flex-shrink-0 flex justify-start gap-2">
            <div className="bg-gray-300 h-5 w-20 rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-5 w-20 rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-5 w-20 rounded-md animate-pulse"></div>
          </div>
          <div className="md:ml-6 w-full flex gap-2 justify-between">
            <div className="bg-gray-300 h-5 w-32  rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-5 w-32  rounded-md animate-pulse"></div>
          </div>
          <div className="flex flex-col mt-10 items-center gap-5">
            {SekeletonArray.map((skleton: any) => (
              <div
                key={skleton}
                className="w-full border-b border-b-gray-300 h-auto rounded-md animate-pulse"
              >
                <div className="w-full flex flex-col gap-2 relative p-4 md:mt-4 lg:mt-10 lg:p-3 ">
                  <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                  <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
                  <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
                  <div className="w-44 md:w-72 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                  <div className="w-44 md:w-72 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-2002"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full md:w-5/6 flex flex-col items-center">
          <BreadCrumbV1
            firstRoute={
              (dataSurah as TypeDataSurahById)?.data?.name?.transliteration?.id
            }
            firstRouteLink="/quran"
            routeOption1="Terjemah"
            routeOption2="Baca"
            option={optionSurah}
            setOption={setOptionSurah}
          />
          <div className="flex w-full justify-between gap-2 px-4 ">
            <button
              className="font-semibold text-sm "
              onClick={() => {
                if (idSurahPage > 1) {
                  navigate(`/quran/surah/${parseInt(idSurahPage) - 1}`);
                }
              }}
            >
              &laquo;&nbsp;&nbsp;Surah Sebelumnya
            </button>

            <div
              className={`${audioActive === null && "invisible"} flex relative`}
            >
              <LoaderCircle className="animate-spin w-10 h-10" />
              <span className="inline-block text-sm absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
                {audioActive?.number?.inSurah}
              </span>
            </div>
            <button
              className="font-semibold text-sm "
              onClick={() => {
                if (idSurahPage < 114) {
                  navigate(`/quran/surah/${parseInt(idSurahPage) + 1}`);
                }
              }}
            >
              Surah Berikutnya&nbsp;&nbsp;&raquo;
            </button>
          </div>
          <div className="border w-full border-gray-300"></div>
              
          {optionSurah === "Terjemah" ? <TerjemahRoute /> : <BacaRoute />}
        </div>
      )}
    </MainLayouts>
  );
};

export default SurahByIdPage;
