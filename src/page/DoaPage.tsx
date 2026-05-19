import { useEffect } from "react";
import { useDoaBySc, useScDoa } from "../state/Query";
import MainLayouts from "../components/layouts/Main";
import skeletonArray from "../helper/_skeleton";
import { useBookMarkDoa, useCurrentSc, useDarkmode } from "../state/TypeHooks";
import { TypeDoa, TypeDoaMap, TypeSc } from "../model/_Type";
import LoveIcon from "../components/element/Icon/LoveIcon";
import Border from "../components/element/Border";

const DoaPage = () => {
  /** state current theme */
  const darkMode = useDarkmode((state) => state.darkMode);

  /** get sc data*/
  const { data: dataSc }: any = useScDoa();

  /** caching sc */
  const currentSc = useCurrentSc((s: any) => s.currentSc);
  const setCurrentSc = useCurrentSc((s: any) => s.setCurrentSc);

  /** get sc data*/
  const { data: dataDoas, isLoading: isLoadingDoa } = useDoaBySc(currentSc);

  /** caching bookmark doa */
  const bookMark = useBookMarkDoa((s: any) => s.bookMark);
  const addBookMark = useBookMarkDoa((s: any) => s.addBookMark);
  const deleteBookMark = useBookMarkDoa((s: any) => s.deleteBookMark);

  /** handle bookmark doa */
  const onHandleBookMark = (props: TypeDoaMap) => {
    const filtered = bookMark.some((item: any) => item.judul === props.judul);
    // if filtered true
    if (filtered) {
      deleteBookMark(props.judul);
    } else {
      addBookMark(props);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayouts>
      <div className="flex w-full md:w-5/6 justify-center">
        <select
          value={currentSc}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setCurrentSc(e.target.value);
          }}
          className="block w-full max-w-2xl px-3 py-2.5 bg-neutral-secondary-medium border-0 border-b-gray-500 border-b-2 text-heading text-sm rounded-base focus:ring-0 focus:border-b-gray-500 placeholder:text-body"
          id=""
        >
          <option value="" disabled>
            Cari Doa
          </option>
          {(dataSc as TypeSc)?.data.map((sc: string, index: number) => (
            <option
              value={sc}
              key={index}
              className="w-full max-w-sm border rounded items-center mt-3 p-4 flex justify-between hover:border-2"
            >
              {sc}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full md:w-5/6 flex items-center gap-2 flex-col p-2">
        {isLoadingDoa ? (
          <div className="w-full flex flex-col items-center ">
            {skeletonArray(20).map((skleton: number) => (
              <div
                key={skleton}
                className={`w-full border-b ${
                  darkMode ? "border-b-white" : "border-b-black"
                } h-auto rounded-md gap-2 p-2 animate-pulse `}
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
        ) : (
          <div className="w-full gap-2 p-2 flex flex-col items-center">
            {(dataDoas as TypeDoa)?.data?.map(
              (doa: TypeDoaMap, index: number) => (
                <div
                  className={`w-full p-2 border-b border-b-slate-700`}
                  key={doa?.judul}
                >
                  <div className="flex items-center gap-2 justify-start">
                    <Border number={index + 1} />
                    <h1 className="text-xl text-center lg:text-2xl">
                      {doa?.judul}
                    </h1>
                  </div>
                  <div className="flex justify-end my-5 md:my-6">
                    <LoveIcon
                      onClick={() => onHandleBookMark(doa)}
                      fill={
                        bookMark.some(
                          (bm: TypeDoaMap) => bm.judul === doa?.judul
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
                  <h1 dir="rtl" className="font-amiri leading-loose text-4xl">
                    {doa?.arab}
                  </h1>
                  <div className="mt-4">
                    <p className="text-left text-sm font-normal md:text-base">
                      <span className="font-semibold ">artinya : </span>
                      {doa?.indo}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </MainLayouts>
  );
};

export default DoaPage;
