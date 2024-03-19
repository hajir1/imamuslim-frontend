import { useGetAsmaulHusna } from "../../state/Query";
import { DataAsmaulHusna } from "../../model/Interface";
import Border from "../element/Border";
import { useDarkmode } from "../../state/Zustand";
import Sekeleton from "../element/Sekeleton";

const AsmaulHusna = () => {
  const { data } = useGetAsmaulHusna();
  const darkMode = useDarkmode((state) => state.darkMode);
  const skeletonArray: any = Array.from({ length: 20 }, (_, index) => index);
  return (
    <div className="w-full flex items-center flex-col">
      <div className="w-full flex justify-center bg-white ">
        {" "}
        <img
          className="w-3/5 h-20 object-cover md:h-44 lg:w-2/5 lg:h-44"
          src="./iconasmaulHusna.png"
          alt=""
        />
      </div>
      <div className="w-full flex flex-wrap gap-2 justify-center my-4 lg:p-4">
        {(data as [])?.length > 0 ? (
          (data as [])?.map((item: DataAsmaulHusna) => (
            <div
              className={`${
                darkMode ? "border-b-2 border-b-white" : "border-even"
              } w-[95%]  p-2 lg:w-full`}
              key={item?.urutan}
            >
              <Border number={`${item?.urutan}`} border="border-black" />
              <h1 className="text-right text-3xl lg:text-4xl">{item?.arab}</h1>
              <p className="font-semibold text-primary lg:text-4xl">
                {item?.latin}
              </p>
              <p className="text-sm lg:text-2xl">{item?.arti}</p>
            </div>
          ))
        ) : (
          <div className="flex justify-center flex-wrap gap-2 w-[95%]">
            {skeletonArray?.map((item: any) => (
              <Sekeleton custom="h-32 lg-w-full" key={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AsmaulHusna;
