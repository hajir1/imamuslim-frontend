import { useState } from "react";
import { useGetAlQuranSurahBySurah } from "../state/Query";
import { useParams } from "react-router-dom";
import { useDarkmode } from "../state/Zustand";
import { DataGetAlQuranSurahById } from "../model/Interface";
import HomeIcon from "../components/element/Icon/Homeicon";
import TerjemahbtnIcon from "../components/element/Icon/TerjemahbtnIcon";
import BacaIcon from "../components/element/Icon/BacaIcon";
import { BacaRoute, TerjemahRoute } from "../components/layouts/RouteSurahById";
import ErrorConn from "../components/fragment/ErrorConn";

const SurahQuranPage = () => {
  const [read, setRead] = useState<
    boolean | React.Dispatch<React.SetStateAction<boolean>>
  >(false);
  const { data, isError } = useGetAlQuranSurahBySurah();
  const { surah } = useParams();
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      }`}
    >
      <div className={`w-full p-2`}>
        <div className="w-full">
          <h1 className={`text-3xl font-semibold text-center`}>
            {(data as DataGetAlQuranSurahById)?.data?.name?.transliteration?.id}
          </h1>
          <p className="text-base text-center">
            {(data as DataGetAlQuranSurahById)?.data?.name?.translation?.id}
          </p>
        </div>
        <div className="w-full flex items-center">
          <HomeIcon
            fill={`${darkMode ? "white" : "black"}`}
            handler={() => (window.location.href = `/quran`)}
          />
          <p className="mx-4">{`/ Surah ke ${surah}`}</p>
        </div>
        <div className="mt-4">
          <p className={` font-semibold `}>deskripi : </p>
          <p className="text-base ">
            {(data as DataGetAlQuranSurahById)?.data?.tafsir?.id}
          </p>
        </div>
        <div className="mt-1">
          <p className="text-base font-semibold ">
            jumlah ayat :{" "}
            <span className="font-normal">
              {(data as DataGetAlQuranSurahById)?.data?.numberOfVerses} ayat
            </span>
          </p>
        </div>
        <div className="mt-1">
          <p className="text-base font-semibold ">
            wahyu diturunkan :{" "}
            <span className="font-normal">
              {(data as DataGetAlQuranSurahById)?.data?.revelation?.id} /{" "}
              {(data as DataGetAlQuranSurahById)?.data?.revelation?.arab}
            </span>
          </p>
        </div>
        <div className="w-full flex justify-evenly mt-4 p-2">
          <button
            onClick={() => setRead(false)}
            className={`${!read && "border-b-2 border-b-black"} ${
              darkMode ? "text-white border-b-white" : "text-gray-800"
            } font-bold py-2 px-4 rounded inline-flex items-center`}
          >
            <TerjemahbtnIcon />
            <span className="mx-2">Terjemah</span>
          </button>
          <button
            onClick={() => setRead(true)}
            className={`${read && "border-b-2 border-b-black"} ${
              darkMode ? "text-white border-b-white" : "text-gray-800"
            } font-bold py-2 px-4 rounded inline-flex items-center`}
          >
            <BacaIcon width="1rem" height="1rem" />
            <span className="mx-2">Baca</span>
          </button>
        </div>
        {!read ? <TerjemahRoute /> : <BacaRoute />}
        {isError && <ErrorConn />}
      </div>
    </div>
  );
};

export default SurahQuranPage;
