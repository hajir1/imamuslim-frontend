// import { useDarkmode } from "../../state/Zustand";

type SekeletonProps = {
  keyS?: any;
  custom: string;
  position?: string;
};
const skeletonArray: any = Array.from({ length: 20 }, (_, index) => index);
export const Sekeleton = ({ keyS, custom, position }: SekeletonProps) => {
  return (
    <div
      key={keyS}
      className={`${custom} ${
        position === "full" ? "w-full" : "w-full md:w-[47%] lg:w-[30%]"
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
        <div className="w-1/3 lg:w-20 outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-6"></div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="w-full outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-72"></div>
        <div className="w-1/2 lg:w-40 outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-6"></div>
        <div className="w-2/3 lg:w-64 outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-6"></div>
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
      <div className="w-[30%] lg:w-[10%] outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-10 mt-10 mx-2"></div>
      <div className="flex justify-center w-full flex-wrap p-2">
        {skeletonArray?.map((item: any) => (
          <Sekeleton position="full" custom="h-32 lg:w-full mt-4" key={item} />
        ))}
      </div>
    </div>
  );
};
export const SekeletonHadist = () => {
  return (
    <div className="w-full flex flex-wrap flex-col items-center">
      <div className="w-[38%] lg:w-1/6 outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-10 my-2"></div>
      <div className="w-[25%] lg:w-[8rem] outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-8"></div>
      <div className="w-[95%] lg:w-1/2 outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-10 my-8"></div>
      <div className="w-[30%] outline-none border rounded-md bg-gray-300  relative animate-pulse transition-all duration-300 h-14 mt-4 mx-2"></div>
      <div className="flex justify-center w-full flex-wrap">
        {skeletonArray?.map((item: any) => (
          <Sekeleton position="full" custom="h-32 lg:w-5/6 mt-4" key={item} />
        ))}
      </div>
    </div>
  );
};
