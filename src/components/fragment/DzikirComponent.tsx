import { useEffect, useState } from "react";
import { useBookMarkDzikir, useDarkmode } from "../../state/TypeHooks";
import Border from "../element/Border";
import LoveIcon from "../element/Icon/LoveIcon";
import { Sekeleton } from "../element/Sekeleton";

const DzikirComponent = ({ data }: any) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const [fillLove, setFillLove] = useState<[]>([]);
  const { bookMark, addBookMark }: any = useBookMarkDzikir();
  const skeletonArray: any = Array.from({ length: 20 }, (_, index) => index);
  useEffect(() => {
    const filtered = bookMark.filter((dzikir: any) => dzikir.love === true);
    setFillLove(filtered);
  }, [bookMark]);

  const onHandleBookMark = (
    id: string,
    title: string,
    arabic: string,
    latin: string,
    translate: string,
    love = true
  ) => {
    addBookMark({ id, title, arabic, latin, translate, love });
  };
  return (
    <div className="w-full flex flex-col items-center">
      {" "}
      {(data as any)?.length > 0 ? (
        (data as any)?.map((dzikir: any, index: number) => (
          <div
            className={`${
              darkMode && " border-b-2 border-b-white"
            } w-full my-3 p-3`}
            key={index + 1}
          >
            <div className="flex justify-evenly bg-secondary p-1 items-center">
              <Border
                border="border-white border-2"
                numberClass={`${darkMode ? "" : "text-white"}`}
                number={index + 1}
              />{" "}
              <h1 className="w-[95%] text-xl text-center text-white lg:text-2xl">
                {dzikir?.title}
              </h1>
            </div>
            <div className="flex justify-end w-full mt-2">
              <LoveIcon
                handleBookMark={() =>
                  onHandleBookMark(
                    dzikir.id,
                    dzikir.title,
                    dzikir.arabic,
                    dzikir.latin,
                    dzikir.translation
                  )
                }
                fill={
                  fillLove.some((love: any) => dzikir.title === love.title)
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
              <h1
                dir="rtl"
                className="font-sans lg:tracking-wide leading-relaxed lg:leading-loose text-3xl"
              >
                {dzikir?.arabic}
              </h1>
            </div>
            <div className="w-full mt-4">
              <h1 className="text-xl font-arabic text-primary lg:text-slate-900">
                {dzikir?.latin}
              </h1>
              <p
                className={`${
                  darkMode ? "" : "text-slate-800"
                } font-arabic lg:text-base lg:mt-4`}
              >
                <span className="font-bold font-sans">artinya : </span>
                {dzikir?.translation}
              </p>
              <div className="my-2 font-sans">
                <p className={`${darkMode ? "" : "text-slate-800"}`}>
                  <span className="font-bold font-sans">
                    notes : {dzikir?.notes}
                  </span>
                </p>
                <p className={`${darkMode ? "" : "text-slate-800"}`}>
                  <span className="font-bold font-arabic">
                    hadist : {dzikir?.source}
                  </span>
                </p>
              </div>
              <p className="text-center font-arabic">
                <span className="font-semibold block text-center uppercase mt-4">
                  fawaid
                </span>{" "}
                {dzikir?.fawaid ? dzikir?.fawaid : " tidak ada fawaid"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center flex-wrap gap-2 w-[95%]">
          {skeletonArray?.map((dzikir: any) => (
            <Sekeleton custom="h-40 lg:w-full" key={dzikir} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DzikirComponent;
