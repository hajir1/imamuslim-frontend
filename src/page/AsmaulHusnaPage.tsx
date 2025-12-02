import { useEffect } from "react";
import Border from "../components/element/Border";
import LoveIcon from "../components/element/Icon/LoveIcon";
import { TypeAsmaulHusna } from "../model/_Type";
import { useAsmaulHusna } from "../state/Query";
import { useBookMarkAsmaulHusna, useDarkmode } from "../state/TypeHooks";
import MainLayouts from "../components/layouts/Main";

const AsmaulHusnaPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);

  /** get data asmaul husna */
  const { data: dataAsmaulHusna, isLoading: loadingAsmaulHusna } =
    useAsmaulHusna();
  const skeletonArray: any = Array.from({ length: 100 }, (_, index) => index);
  const {
    addBookMark,
    deleteBookMark,
    bookMark: bmAsmaulHusna,
  }: any = useBookMarkAsmaulHusna();

  const onHandleAddBookMark = (
    urutan: string,
    arab: string,
    latin: string,
    arti: string,
    bookMark = true
  ) => {
    const filtering = bmAsmaulHusna.some(
      (item: TypeAsmaulHusna) => item.urutan === urutan
    );
    if (filtering) {
      deleteBookMark(urutan);
    } else {
      addBookMark({ urutan, arab, latin, arti, bookMark });
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
          {skeletonArray.map((skeleton: any) => (
            <div
              key={skeleton}
              className="w-full border-b border-b-gray-300 h-auto rounded-md  p-2 animate-pulse flex flex-col gap-2"
            >
              <div className="flex justify-between gap-2">
                <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
                <div className="w-6 h-6 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
              </div>
              <div className="w-32 h-8 bg-gray-300 animate-pulse rounded-md transition-all duration-200 ml-auto"></div>
              <div className="w-28 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-200"></div>
              <div className="w-52 h-5 bg-gray-300 animate-pulse rounded-md transition-all duration-2002"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full md:w-5/6 flex items-center flex-col gap-4 ">
          {(dataAsmaulHusna as [])?.map((asmaulHusna: TypeAsmaulHusna) => (
            <div className={`w-full border-b p-2`} key={asmaulHusna?.urutan}>
              <div className="flex w-full justify-between">
                <Border number={asmaulHusna?.urutan} />
                <LoveIcon
                  fill={
                    bmAsmaulHusna.some(
                      (item: any) => item.urutan === asmaulHusna?.urutan
                    )
                      ? darkMode
                        ? "white"
                        : "black"
                      : darkMode
                      ? "black"
                      : "white"
                  }
                  onClick={() => {
                    onHandleAddBookMark(
                      asmaulHusna?.urutan,
                      asmaulHusna?.arab,
                      asmaulHusna?.latin,
                      asmaulHusna?.arti
                    );
                  }}
                />
              </div>
              <h1 className="w-full font-sans font-normal md:font-thin leading-relaxed lg:leading-normal text-4xl text-right">
                {asmaulHusna?.arab}
              </h1>
              <p className="text-base capitalize tracking-wider mt-4 mb-2 font-semibold text-left lg:text-md lg:mt-2">
                {asmaulHusna?.latin}
              </p>
              <p className="text-left text-sm font-normal md:text-base lg:mt-2">
                <span className="font-semibold ">artinya : </span>
                {asmaulHusna?.arti}
              </p>
            </div>
          ))}
        </div>
      )}
    </MainLayouts>
  );
};

export default AsmaulHusnaPage;
