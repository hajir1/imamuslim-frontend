import { useNavigate, useParams } from "react-router-dom";
import { useGetJuz } from "../../state/Query";

import { useEffect } from "react";
import { TypeDataJuz, TypeDataJuzMap } from "../../model/Interface";

import { BreadCrumbV1 } from "../../components/fragment/Breadcrumb";
import MainLayouts from "../../components/layouts/Main";
import Box from "../../components/fragment/BoxModel";

const JuzByIdPage = () => {
  const { juz: idJuzPage }: any = useParams();
  const { data: dataJuz, isLoading: loadingJuz } = useGetJuz(idJuzPage);
  const navigate = useNavigate();
  const SekeletonArray = Array.from({ length: 10 }, (_, index) => index);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [idJuzPage]);

  return (
    <MainLayouts navbarType="quran">
      {loadingJuz ? (
        <div className="w-full md:w-5/6 flex gap-2 flex-col p-2">
          <div className="flex-shrink-0 flex justify-start gap-2">
            <div className="bg-gray-300 h-5 md:ml-6 w-20 rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-5 w-20 rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-5 w-20 rounded-md animate-pulse"></div>
          </div>
          <div className="w-full flex gap-2 justify-between">
            <div className="bg-gray-300 h-5 md:ml-6 w-32  rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-5 w-32  rounded-md animate-pulse"></div>
          </div>
          <div className="w-full flex flex-col items-center gap-2 p-2">
            {SekeletonArray.map((skleton: any) => (
              <div
                key={skleton}
                className="w-full h-auto border-b-gray-300 rounded-md animate-pulse"
              >
                <div className="w-full flex flex-col gap-2 relative p-4 md:mt-4 lg:mt-10 lg:p-3 ">
                  <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-300"></div>
                  <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-300 ml-auto"></div>
                  <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-300 ml-auto"></div>
                  <div className="w-44 md:w-72 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-300"></div>
                  <div className="w-44 md:w-72 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-3002"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full md:w-5/6 flex flex-col items-center">
          <BreadCrumbV1
            firstRoute={`Juz ${(dataJuz as TypeDataJuz)?.data?.juz.toString()}`}
            firstRouteLink="/quran"
          />
          <div className="flex w-full justify-between gap-2 px-4">
            <button
              className="font-semibold text-sm "
              onClick={() => {
                if (parseInt(idJuzPage) > 1) {
                  navigate(`/quran/juz/${parseInt(idJuzPage) - 1}`);
                }
              }}
            >
              &laquo;&nbsp;&nbsp;Juz Sebelumnya
            </button>
            <div className="w-10 h-10"></div>
            <button
              className="font-semibold text-sm "
              onClick={() => {
                if (parseInt(idJuzPage) < 30) {
                  navigate(`/quran/juz/${parseInt(idJuzPage) + 1}`);
                }
              }}
            >
              Juz Berikutnya&nbsp;&nbsp;&raquo;
            </button>
          </div>
          <div className="border w-full border-gray-300"></div>
          {(dataJuz as TypeDataJuz)?.data?.verses?.map(
            (data: TypeDataJuzMap) => (
              <Box
                key={data?.number?.inQuran}
                audio={""}
                bottomNavigation={null}
                data={data}
                handleBottomNavigation={() => {}}
                setCurrentData={""}
                terjemahOption={null}
              />
            )
          )}
        </div>
      )}
    </MainLayouts>
  );
};

export default JuzByIdPage;
