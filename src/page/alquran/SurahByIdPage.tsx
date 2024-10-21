import React, { useEffect, useRef, useState } from "react";
import { useGetSurahById } from "../../state/Query";
import { useNavigate, useParams } from "react-router-dom";
import { useAudioActive, useDarkmode } from "../../state/TypeHooks";
import { TypeDataSurahById } from "../../model/Interface";
import {
  BacaRoute,
  TerjemahRoute,
} from "../../components/layouts/alquran/OpsiBaTe";
import ErrorConn from "../../components/fragment/ErrorConn";
import { BreadCrumbV1 } from "../../components/fragment/Breadcrumb";
import { LoaderCircle } from "lucide-react";
import Navbar from "../../components/layouts/Navbar";

const SurahByIdPage = () => {
  const { audioActive } = useAudioActive();
  const [optionSurah, setOptionSurah] = useState<
    string | React.Dispatch<React.SetStateAction<string>>
  >("Terjemah");
  const { surah: idSurahPage }: any = useParams();
  const response = useGetSurahById(idSurahPage);
  const navigate = useNavigate();

  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div className={`${darkMode && "dark-mode"} flex justify-center`}>
      <div className={`w-full`}>
        <Navbar type="quran" />
        <div className="w-full h-24 mt-16 lg:px-5 lg:flex flex-col items-center">
          <BreadCrumbV1
            type="surahById"
            firstRoute="al-Quran"
            secondRoute="Surah"
            response={response}
            option={optionSurah}
            opsi1="Terjemah"
            opsi2="Baca"
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
              <LoaderCircle className="animate-spin w-7 h-7" />
              <span className="inline-block text-xs absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
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
        {optionSurah === "Terjemah" ? <TerjemahRoute /> : <BacaRoute />}
        {response.isError && <ErrorConn />}
      </div>
    </div>
  );
};

export default SurahByIdPage;
