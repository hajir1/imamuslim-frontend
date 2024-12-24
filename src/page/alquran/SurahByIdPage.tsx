import React, { useState } from "react";
import { useGetSurahById } from "../../state/Query";
import { useNavigate, useParams } from "react-router-dom";
import { useAudioActive } from "../../state/TypeHooks";
import {
  BacaRoute,
  TerjemahRoute,
} from "../../components/layouts/alquran/OpsiBaTe";
import ErrorConn from "../../components/fragment/ErrorConn";
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
  const {
    data: dataSurah,
    isLoading: isLoadingSurah,
    isError: isErrorSurah,
  } = useGetSurahById(idSurahPage);
  const navigate = useNavigate();
  const SekeletonArray = Array.from({ length: 30 }, (_, index) => index);

  return (
    <MainLayouts navbarType={"quran"}>
    {isLoadingSurah ? (
      <div className="w-full flex gap-2 flex-col p-2">
        <div className="flex-shrink-0 flex justify-start gap-2">
          <div className="bg-gray-200 h-8 md:ml-6 w-20 rounded-md animate-pulse"></div>
          <div className="bg-gray-200 h-8 w-20 rounded-md animate-pulse"></div>
          <div className="bg-gray-200 h-8 w-20 rounded-md animate-pulse"></div>
        </div>
        <div className="w-full flex gap-2 justify-between">
          <div className="bg-gray-200 h-8 md:ml-6 w-32  rounded-md animate-pulse"></div>
          <div className="bg-gray-200 h-8 w-32  rounded-md animate-pulse"></div>
        </div>
        <div className="flex flex-col items-center gap-2 p-2">
         {SekeletonArray.map((skleton: any) => (
           <div
             key={skleton}
             className="w-full bg-gray-200 h-44 md:h-64 md:w-11/12 rounded-md animate-pulse"
           ></div>
         ))}
       </div>
      </div>
    ) : (
      <>
        <div className="w-full h-24 lg:px-5 flex flex-col items-center">
          <BreadCrumbV1
            firstRoute={
              (dataSurah as TypeDataSurahById)?.data?.name?.transliteration
                ?.id
            }
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
              className={`${
                audioActive === null && "invisible"
              } flex relative`}
            >
              <LoaderCircle className="animate-spin w-10 h-10" />
              <span className="inline-block text-sm absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
                {audioActive?.number?.inSurah}
              </span>
            </div>
            {/* <ArrowDownFromLine className={`${!itemData && "hidden"}`} /> */}
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
        </div>
        <>
          {optionSurah === "Terjemah" ? <TerjemahRoute /> : <BacaRoute />}
          {isErrorSurah && <ErrorConn />}
        </>
      </>
    )}
  </MainLayouts>
  );
};

export default SurahByIdPage;
