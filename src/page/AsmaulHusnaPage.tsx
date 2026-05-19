import { useEffect } from "react";
import Border from "../components/element/Border";
import LoveIcon from "../components/element/Icon/LoveIcon";
import { TypeAsmaulHusna, TypeAsmaulHusnaMap } from "../model/_Type";
import { useAsmaulHusna } from "../state/Query";
import { useBookMarkAsmaulHusna, useDarkmode } from "../state/TypeHooks";
import MainLayouts from "../components/layouts/Main";
import skeletonArray from "../helper/_skeleton";

const AsmaulHusnaPage = () => {
  /** state current theme */
  const darkMode = useDarkmode((state) => state.darkMode);

  /** get data asmaul husna */
  const { data: dataAsmaulHusna, isLoading: loadingAsmaulHusna } =
    useAsmaulHusna();

  /** handle cache create and delete bookmark asmaul husna */
  const bookMark = useBookMarkAsmaulHusna((s: any) => s.bookMark);
  const addBookMark = useBookMarkAsmaulHusna((s: any) => s.addBookMark);
  const deleteBookMark = useBookMarkAsmaulHusna((s: any) => s.deleteBookMark);

  /** handle bookMark Asmaul husna*/
  const onHandleBookMark = (props: TypeAsmaulHusnaMap) => {
    const filtering = bookMark.some(
      (item: TypeAsmaulHusnaMap) => item.id === props.id
    );
    if (filtering) {
      deleteBookMark(props.id);
    } else {
      addBookMark(props);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    // navbarType="asmaulHusna"
    <MainLayouts>
      {loadingAsmaulHusna ? (
        <div className="flex w-full md:w-5/6 flex-col gap-2">
          {skeletonArray(100).map((skeleton: number) => (
            <div
              key={skeleton}
              className="w-full border-b border-b-gray-300 h-auto rounded-md p-2 animate-pulse flex flex-col gap-2 space-y-2"
            >
              <div className="flex justify-between gap-2">
                <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
              </div>
              <div className="w-32 h-8 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
              <div className="w-28 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
              <div className="w-52 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full md:w-5/6 flex items-center flex-col gap-2">
          {(dataAsmaulHusna as TypeAsmaulHusna)?.data?.map(
            (asmaulHusna: TypeAsmaulHusnaMap) => (
              <div className={`w-full border-b ${
              darkMode ? "border-b-white" : "border-b-black"
            } p-2 space-y-2`} key={asmaulHusna?.id}>
                <div className="flex w-full justify-between">
                  <Border number={asmaulHusna?.id} />
                  <LoveIcon
                    fill={
                      bookMark.some(
                        (item: TypeAsmaulHusnaMap) =>
                          item.id === asmaulHusna?.id
                      )
                        ? darkMode
                          ? "white"
                          : "black"
                        : darkMode
                        ? "black"
                        : "white"
                    }
                    onClick={() => {
                      onHandleBookMark(asmaulHusna);
                    }}
                  />
                </div>
                <h1 dir="rtl" className="font-amiri leading-loose text-4xl">
                  {asmaulHusna?.arab}
                </h1>
                <p className="text-base capitalize font-semibold text-left lg:text-md">
                  {asmaulHusna?.latin}
                </p>
                <p className="text-left text-sm font-normal md:text-base">
                  <span className="font-semibold ">artinya : </span>
                  {asmaulHusna?.indo}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </MainLayouts>
  );
};

export default AsmaulHusnaPage;
