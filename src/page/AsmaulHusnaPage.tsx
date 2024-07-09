import { useEffect, useState } from "react";
import Border from "../components/element/Border";
import LoveIcon from "../components/element/Icon/LoveIcon";
import { Sekeleton } from "../components/element/Sekeleton";
import Navbar from "../components/layouts/Navbar";
import { DataAsmaulHusna } from "../model/Interface";
import { useGetAsmaulHusna } from "../state/Query";
import { useBookMarkAsmaulHusna, useDarkmode } from "../state/Zustand";

const AsmaulHusnaPage = () => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const { data } = useGetAsmaulHusna();
  const [fillLove, setFillLove] = useState<any[]>([]);
  const skeletonArray: any = Array.from({ length: 20 }, (_, index) => index);
  const { addBookMark, bookMark }: any = useBookMarkAsmaulHusna();

  const onHandleAddBookMark = (
    urutan: string,
    arab: string,
    latin: string,
    arti: string,
    love = true
  ) => {
    addBookMark({ urutan, arab, latin, arti, love });
  };

  useEffect(() => {
    const lovedItems = bookMark.filter((item: any) => item.love === true);
    setFillLove(lovedItems);
  }, [bookMark]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-slate-900"
      } flex flex-col`}
    >
      <Navbar type="asmaulhusna" />
      <div className="w-full mt-20">
        <div className="w-full flex items-center flex-col">
          <div className="w-full flex justify-center bg-white">
            <img
              className="w-3/5 h-20 object-cover md:h-44 lg:w-2/5 lg:h-44"
              src="./iconasmaulHusna.png"
              alt=""
            />
          </div>
          <div className="w-full flex flex-wrap gap-2 justify-center my-4 lg:p-4">
            {(data as [])?.length > 0 ? (
              (data as [])?.map((asmaulHusna: DataAsmaulHusna) => (
                <div
                  className={`${
                    darkMode ? " border-b-white" : "border-b-gray-500 lg:border-b-gray-200"
                  } w-[95%]  p-2 border-b-[1px] lg:w-full`}
                  key={asmaulHusna?.urutan}
                >
                  <div className="flex w-full justify-between">
                    <Border
                      number={`${asmaulHusna?.urutan}`}
                      border="border-black"
                    />
                    <LoveIcon
                      fill={
                        fillLove.some(
                          (item) => item.urutan === asmaulHusna?.urutan
                        )
                          ? darkMode
                            ? "white"
                            : "black"
                          : darkMode
                          ? "black"
                          : "white"
                      }
                      handleBookMark={() => {
                        onHandleAddBookMark(
                          asmaulHusna?.urutan,
                          asmaulHusna?.arab,
                          asmaulHusna?.latin,
                          asmaulHusna?.arti
                        );
                      }}
                    />
                  </div>
                  <h1 className="text-right font-arabic text-4xl">
                    {asmaulHusna?.arab}
                  </h1>
                  <p className="font-semibold text-2xl font-sans text-primary lg:text-4xl">
                    {asmaulHusna?.latin}
                  </p>
                  <p className="text-base font-sans lg:text-2xl">
                    {" "}
                    <span className="font-semibold">artinya : </span>{" "}
                    {asmaulHusna?.arti}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex justify-center flex-wrap gap-2 w-[95%]">
                {skeletonArray?.map((item: any) => (
                  <Sekeleton
                    position="full"
                    custom="h-32 lg:w-full"
                    key={item}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsmaulHusnaPage;
