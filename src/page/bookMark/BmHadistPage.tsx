import { useParams } from "react-router-dom";
import MainLayouts from "../../components/layouts/Main";
import { useGetHadistByNumber } from "../../state/Query";
import LoveIcon from "../../components/element/Icon/LoveIcon";
import { useBookMarkHadist, useDarkmode } from "../../state/TypeHooks";

const BmHadistPage = () => {
  const { slug, id } = useParams();
  const { data: dataHadist, isLoading: hadistLoading } = useGetHadistByNumber(
    slug,
    id
  );
  const { bookMark: bmHadist, deleteBookMark }: any = useBookMarkHadist();
  const { darkMode } = useDarkmode();

  return (
    <MainLayouts navbarType="hadist">
      {hadistLoading ? (
        <div className="w-full md:w-5/6 flex gap-2 flex-col p-2">
          <div className="flex-shrink-0 flex flex-col items-center gap-2">
            <div className="bg-gray-300 h-10 w-52 rounded-md animate-pulse"></div>
          </div>
          <div className="w-full flex flex-wrap flex-col gap-2 sm:flex-row sm:justify-center">
            <div className="w-full flex flex-col gap-2 relative">
              <div className="flex justify-start gap-2">
                <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
              </div>
              <div className="w-11/12 h-8 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
              <div className="w-11/12 h-8 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
              <div className="w-11/12 h-8 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
              <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
              <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
              <div className="w-11/12 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center flex-wrap mt-10">
          <div key={(dataHadist as any)?.number} className="p-2 lg:w-5/6">
            <div className="justify-between flex">
              <h1>{(dataHadist as any)?.number}</h1>
              <LoveIcon
                handleBookMark={() => {
                  deleteBookMark(
                    `${(dataHadist as any)?.slug}-${
                      (dataHadist as any)?.number
                    }`
                  );
                  window.location.href = "/";
                }}
                fill={
                  bmHadist.some(
                    (item: any) =>
                      item.id === `${slug}-${(dataHadist as any)?.number}`
                  )
                    ? darkMode
                      ? "white"
                      : "black"
                    : darkMode
                    ? "black"
                    : "white"
                }
              />
            </div>
            <h1
              dir="rtl"
              className="font-sans font-normal md:font-thin leading-relaxed md:leading-loose text-4xl"
            >
              {(dataHadist as any)?.arab}
            </h1>
            <p className="text-left text-sm font-normal md:text-base lg:mt-2">
              <span className="font-semibold ">artinya : </span>
              {(dataHadist as any)?.id}
            </p>
          </div>
        </div>
      )}
    </MainLayouts>
  );
};

export default BmHadistPage;
