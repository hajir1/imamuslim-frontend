import {
  useGetDoa,
  useGetDzikir,
  useGetDzikirPagi,
  useGetDzikirSore,
} from "../../state/Query";
import { DataDoa } from "../../model/Interface";
import Border from "../element/Border";
import { useBookMarkDoa, useDarkmode } from "../../state/Zustand";
import { Sekeleton } from "../element/Sekeleton";
// import React, { useEffect, useState } from "react";
// import BacaIcon from "../element/Icon/BacaIcon";
// import Terjemahicon from "../element/Icon/Terjemahicon";
import ErrorConn from "../fragment/ErrorConn";
import DzikirComponent from "../fragment/DzikirComponent";
import LoveIcon from "../element/Icon/LoveIcon";
import { useEffect, useState } from "react";

export const DoaRoute = () => {
  const { data, isError } = useGetDoa();
  const darkMode = useDarkmode((state) => state.darkMode);
  const [fillLove, setFillLove] = useState<[]>([]);
  const skeletonArray: any = Array.from({ length: 20 }, (_, index) => index);
  const { bookMark, addBookMark }: any = useBookMarkDoa();
  const onHandleBookMark = (
    id : string,
    title: string,
    translate: string,
    arabic: string,
    latin: string,
    love = true
  ) => {
    addBookMark({ id,title, translate, arabic, love, latin });
  };
  useEffect(() => {
    const filtered = bookMark.filter((item: any) => item.love === true);
    setFillLove(filtered);
  }, [bookMark]);
  return (
    <div className="flex w-full items-center flex-col gap-2">
      {(data as [])?.length > 0 ? (
        (data as [])?.map((item: DataDoa) => (
          <div
            className={`${
              darkMode && " border-b-2 border-b-white"
            } w-full my-3 p-3`}
            key={item?.id}
          >
            <div className="flex justify-evenly bg-secondary rounded-sm p-1 items-center">
              <Border
                border="border-white border-2"
                numberClass={`${darkMode ? "" : "text-white"}`}
                number={item?.id}
              />{" "}
              <h1 className="w-[95%] text-xl text-center text-white lg:text-2xl">
                {item?.title}
              </h1>
            </div>
            <div className="flex justify-end my-2 w-full">
              <LoveIcon
                handleBookMark={() =>
                  onHandleBookMark(
                    item?.id,
                    item?.title,
                    item?.translation,
                    item?.arabic,
                    item?.latin
                  )
                }
                fill={
                  fillLove.some((dzikir: any) => dzikir.title === item?.title)
                    ? darkMode
                      ? "white"
                      : "black"
                    : darkMode
                    ? "black"
                    : "white"
                }
              />
            </div>
            <div className="w-full my-4">
              <h1 className="text-right text-3xl lg:text-4xl">
                {item?.arabic}
              </h1>
            </div>
            <div className="w-full my-4">
              <h1 className="text-xl text-primary lg:text-2xl font-sans font-semibold">
                {item?.latin}
              </h1>
              <p className={`${darkMode ? "" : "text-slate-800 font-sans lg:text-xl"}`}>
                <span className="font-semibold">artinya : </span>{item?.translation}
              </p>
              <p className="text-center font-sans lg:text-xl">
                <span className="font-semibold block text-center my-4 ">
                  fawaid
                </span>{" "}
                {item?.fawaid}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center flex-wrap gap-2 w-[95%]">
          {skeletonArray?.map((item: any) => (
            <Sekeleton custom="h-40 lg:w-full" key={item} />
          ))}
        </div>
      )}
      {isError && <ErrorConn />}
    </div>
  );
};

export const DzikirRoute = () => {
  const { data: dzikir, isError } = useGetDzikir();
  const { data: dataDzikirPagi } = useGetDzikirPagi();
  const { data: dataDzikirSore } = useGetDzikirSore();

  return (
    <div>
      <DzikirComponent data={dzikir} />
      <h1 className="text-center text-4xl">dzikir pagi</h1>
      <DzikirComponent data={dataDzikirPagi} />
      <h1 className="text-center text-4xl">dzikir sore</h1>
      <DzikirComponent data={dataDzikirSore} />
      {isError && <ErrorConn />}
    </div>
  );
};
