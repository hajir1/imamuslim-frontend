import { useDarkmode } from "../../state/Zustand";
import Border from "../element/Border";
import Sekeleton from "../element/Sekeleton";

const DzikirComponent = ({ data }: any) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const skeletonArray: any = Array.from({ length: 20 }, (_, index) => index);
  return (
    <div className="w-full flex flex-col items-center">
      {" "}
      {(data as any)?.length > 0 ? (
        (data as any)?.map((item: any, index: number) => (
          <div
            className={`${
              darkMode && " border-b-2 border-b-white"
            } w-full my-3 p-3`}
            key={index + 1}
          >
            <div className="flex justify-evenly bg-secondary p-1 items-center">
              <Border
                border="border-white"
                numberClass={`${darkMode ? "" : "text-white"}`}
                number={index + 1}
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
              <p className={`${darkMode ? "" : "text-slate-800"}`}>
                <span className="font-semibold">notes : {item?.notes}</span>
              </p>
              <p className={`${darkMode ? "" : "text-slate-800"}`}>
                <span className="font-semibold">hadist : {item?.source}</span>
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
    </div>
  );
};

export default DzikirComponent;
