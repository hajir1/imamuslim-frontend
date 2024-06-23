// import { useDarkmode } from "../../state/Zustand";

type SekeletonProps = {
  keyS?: any;
  custom: string;
  position?: string;
};
export const Sekeleton = ({ keyS, custom, position }: SekeletonProps) => {
  return (
    <div
      key={keyS}
      className={`${custom} ${
        position === "asmaulHusna" ? "w-full" : "w-full md:w-[47%] lg:w-[30%]"
      }   outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 `}
    ></div>
  );
};
export const SekeletonPartQuranById = ({ keyS, custom }: SekeletonProps) => {
  return (
    <div
      key={keyS}
      className={`${custom} w-full outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 `}
    ></div>
  );
};
export const SekeletonPartQuranByIdHeaders = () => {
  return (
    <div className={` w-full flex flex-col`}>
      <div className="w-full flex flex-wrap items-center gap-2 flex-col my-2">
        <div className="w-1/2 lg:w-40 outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-10"></div>
        <div className="w-1/3 outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-6"></div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-72"></div>
        <div className="w-1/2 outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-6"></div>
        <div className="w-2/3 outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-6"></div>
      </div>
    </div>
  );
};
export const SekeletonPartQuranJuzById = () => {
  return (
    <div className="w-full flex flex-wrap">
      <div className="w-full flex justify-evenly">
        {" "}
        <div className="w-[38%] outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-10 my-2"></div>
        <div className="w-[20%] outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-10 my-2"></div>
        <div className="w-[38%] outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-10 my-2"></div>
      </div>
      <div className="w-[30%] outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-10 mt-10 mx-2"></div>
      <div className="flex justify-center w-full flex-wrap">
        <Sekeleton keyS={1} custom="w-[97%] h-64 my-1" />
        <Sekeleton keyS={2} custom="w-[97%] h-64 my-1" />
        <Sekeleton keyS={3} custom="w-[97%] h-64 my-1" />
        <Sekeleton keyS={3} custom="w-[97%] h-64 my-1" />
      </div>
    </div>
  );
};
