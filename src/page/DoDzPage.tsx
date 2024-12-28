import { useDoDzOption } from "../state/TypeHooks";
import { DoaRoute, DzikirRoute } from "../components/layouts/OpsiDoDz";
import { useEffect } from "react";
import { useGetDoa, useGetDzikir } from "../state/Query";
import MainLayouts from "../components/layouts/Main";
import { BreadCrumbV1 } from "../components/fragment/Breadcrumb";

const DoDzPage = () => {
  const { doDzOption, setDoDzOption }: any = useDoDzOption();

  const { data: dataDoa, isLoading: doaLoading } = useGetDoa();
  const { data: dataDzikir, isLoading: dzikirLoading } = useGetDzikir();
  const skeletonArray = Array.from({ length: 20 }, (_, index) => index);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <MainLayouts navbarType="dodz">
      {doaLoading && doDzOption === "Doa" ? (
        <div className="w-full md:w-5/6 flex items-center gap-2 flex-col p-2">
          <div className="w-full flex justify-start gap-2">
            <div className="bg-gray-300 h-5 w-20 rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-5 w-20 rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-5 w-20 rounded-md animate-pulse"></div>
          </div>

          <div className="w-full flex flex-col items-center ">
            {skeletonArray.map((skleton: any) => (
              <div
                key={skleton}
                className="w-full border-b border-b-gray-300 h-auto rounded-md gap-2 p-2 animate-pulse"
              >
                <div className="w-full flex flex-col gap-2 relative">
                  <div className="flex justify-start gap-2">
                    <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                    <div className="w-44 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                  </div>
                  <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
                  <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
                  <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
                  <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
                  <div className="w-full h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                  <div className="w-44 md:w-72 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : dzikirLoading && doDzOption === "Dzikir" ? (
        <div className="w-full md:w-5/6 flex items-center gap-2 flex-col p-2">
          <div className="w-full flex justify-start gap-2">
            <div className="bg-gray-300 h-5 w-20 rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-5 w-20 rounded-md animate-pulse"></div>
            <div className="bg-gray-300 h-5 w-20 rounded-md animate-pulse"></div>
          </div>

          <div className="w-full flex flex-col items-center mt-1 gap-2 p-2">
            {skeletonArray.map((skleton: any) => (
              <div
                key={skleton}
                className="w-full border-b-gray-300 h-auto rounded-md gap-2 p-2 animate-pulse"
              >
                <div className="w-full flex flex-col gap-2 relative">
                  <div className="flex justify-start gap-2">
                    <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                    <div className="w-44 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                  </div>
                  <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
                  <div className="w-11/12 md:w-72 h-8 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
                  <div className="w-44 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                  <div className="w-52 md:w-72 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                  <div className="w-40 md:w-84 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                  <div className="w-48 md:w-64 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full md:w-5/6">
          <BreadCrumbV1
            firstRoute="Option"
            firstRouteLink="/dodz"
            routeOption1="Doa"
            routeOption2="Dzikir"
            option={doDzOption}
            setOption={setDoDzOption}
          />
          <hr />
          {doDzOption === "Dzikir" ? (
            <DzikirRoute dataDzikir={dataDzikir} />
          ) : (
            <DoaRoute dataDoa={dataDoa} />
          )}
        </div>
      )}
    </MainLayouts>
  );
};

export default DoDzPage;
