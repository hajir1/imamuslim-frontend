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
          {" "}
          <div className="w-full h-24 lg:px-5 lg:flex flex-col items-center">
            <BreadCrumbV1
              firstRoute={`Juz ${(
                dataJuz as TypeDataJuz
              )?.data?.juz.toString()}`}
            />
            <div className="flex w-full justify-between gap-2 px-4 ">
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
          </div>
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
        </>
      )}
    </MainLayouts>
  );
};

export default JuzByIdPage;
