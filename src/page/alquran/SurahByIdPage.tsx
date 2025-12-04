import { useSurahById } from "../../state/Query";
import { useNavigate, useParams } from "react-router-dom";
import { useAudioActive, useCurrentSurah } from "../../state/TypeHooks";
import {
  BacaRoute,
  TerjemahRoute,
} from "../../components/layouts/alquran/OpsiBaTe";
import { LoaderCircle } from "lucide-react";
import MainLayouts from "../../components/layouts/Main";

const SurahByIdPage = () => {
  const { audioActive } = useAudioActive();
  const { currentSurah }: any = useCurrentSurah();

  /** get id surah*/
  const { surah: idSurah } = useParams();

  const { isLoading: isLoadingSurah } = useSurahById(idSurah);
  const navigate = useNavigate();
  const SekeletonArray = Array.from({ length: 30 }, (_, index) => index);
  return (
    <MainLayouts>
      {isLoadingSurah ? (
        <div className="w-full flex gap-2 flex-col p-2 md:w-5/6">
          <div className="md:ml-6 w-full flex gap-2 justify-between">
            <div className="bg-gray-300 h-5 w-32  rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-5 w-32  rounded-md animate-pulse"></div>
          </div>
          <div className="flex flex-col mt-10 items-center gap-2">
            {SekeletonArray.map((skleton: any) => (
              <div
                key={skleton}
                className="w-full border-b border-b-gray-300 h-auto rounded-md animate-pulse"
              >
                <div className="w-full flex flex-col gap-2 relative p-4 md:mt-4 lg:mt-6 lg:p-3 ">
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
          <div className="flex w-full justify-between gap-2 px-4 ">
            <button
              className="font-semibold text-sm "
              onClick={() => {
                if (parseInt(idSurah ?? "0") > 1) {
                  navigate(`/quran/surah/${parseInt(idSurah ?? "0") - 1}`);
                }
              }}
            >
              &laquo;&nbsp;&nbsp;Surah Sebelumnya
            </button>

            {/* <div
              className={`${audioActive === null && "invisible"} flex relative`}
            >
              <LoaderCircle className="animate-spin w-10 h-10" />
              <span className="inline-block text-sm absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
                {audioActive?.number?.inSurah}
              </span>
            </div> */}
            <button
              className="font-semibold text-sm mt-4"
              onClick={() => {
                if (parseInt(idSurah ?? "0") < 114) {
                  navigate(`/quran/surah/${parseInt(idSurah ?? "0") + 1}`);
                }
              }}
            >
              Surah Berikutnya&nbsp;&nbsp;&raquo;
            </button>
          </div>

          {currentSurah === "Terjemah" ? <TerjemahRoute /> : <BacaRoute />}
        </div>
      )}
    </MainLayouts>
  );
};

export default SurahByIdPage;
