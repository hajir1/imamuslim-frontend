import {
  useGetDoa,
  useGetDzikir,
  useGetDzikirPagi,
  useGetDzikirSore,
} from "../../state/Query";
import { DataDoa } from "../../model/Interface";
import Border from "../element/Border";
import { useDarkmode } from "../../state/Zustand";
import Sekeleton from "../element/Sekeleton";
import React, { useState } from "react";
import BacaIcon from "../element/Icon/BacaIcon";
import Terjemahicon from "../element/Icon/Terjemahicon";
import ErrorConn from "../fragment/ErrorConn";
import DzikirComponent from "../fragment/DzikirComponent";

const DoaRoute = () => {
  const { data, isError } = useGetDoa();
  const darkMode = useDarkmode((state) => state.darkMode);
  const skeletonArray: any = Array.from({ length: 20 }, (_, index) => index);
  return (
    <div className="flex w-full items-center flex-col gap-2">
      {(data as any)?.length > 0 ? (
        (data as any)?.map((item: DataDoa) => (
          <div
            className={`${
              darkMode && " border-b-2 border-b-white"
            } w-full my-3 p-3`}
            key={item?.id}
          >
            <div className="flex justify-evenly bg-secondary p-1 items-center">
              <Border
                border="border-white"
                numberClass={`${darkMode ? "" : "text-white"}`}
                number={item?.id}
              />{" "}
              <h1 className="w-[95%] font-semibold text-xl text-center text-white lg:text-2xl">
                {item?.title}
              </h1>
            </div>
            <div className="w-full my-4">
              <h1 className="text-right text-2xl lg:text-4xl">
                {item?.arabic}
              </h1>
            </div>
            <div className="w-full my-4">
              <h1 className="text-xl text-primary font-semibold">
                {item?.latin}
              </h1>
              <p className={`${darkMode ? "" : "text-slate-800"}`}>
                {item?.translation}
              </p>
              <p className="text-center">
                <span className="font-semibold block text-center my-4">
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

const DzikirRoute = () => {
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

const RouteDoaDzikir = () => {
  const [dzikir, setDzikir] = useState<
    boolean | React.Dispatch<React.SetStateAction<boolean>>
  >(false);
  const darkMode = useDarkmode((state) => state.darkMode);
  return (
    <div className="w-full p-2">
      <div className="w-full flex justify-evenly mt-4 p-2">
        <button
          onClick={() => setDzikir(false)}
          className={`${!dzikir && "border-b-2 border-b-black"} ${
            darkMode ? "text-white border-b-white" : "text-gray-800"
          } font-bold py-2 px-4 rounded inline-flex items-center`}
        >
          <Terjemahicon />
          <span className="mx-2">Doa</span>
        </button>
        <button
          onClick={() => setDzikir(true)}
          className={`${dzikir && "border-b-2 border-b-black"} ${
            darkMode ? "text-white border-b-white" : "text-gray-800"
          } font-bold py-2 px-4 rounded inline-flex items-center`}
        >
          <BacaIcon width="1.6rem" height="1.6rem" />
          <span className="mx-2">Dzikir</span>
        </button>
      </div>
      {dzikir ? <DzikirRoute /> : <DoaRoute />}
    </div>
  );
};

export default RouteDoaDzikir;
