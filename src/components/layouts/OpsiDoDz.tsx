import { TypeDataDoa } from "../../model/_Type";
import Border from "../element/Border";
import { useBookMarkDoa, useDarkmode } from "../../state/TypeHooks";

import LoveIcon from "../element/Icon/LoveIcon";

export const DoaRoute = ({ dataDoa }: any) => {
  const darkMode = useDarkmode((state) => state.darkMode);
  const {
    bookMark: bmDoa,
    addBookMark,
    deleteBookMark,
  }: any = useBookMarkDoa();
  const onHandleBookMark = (id: string, title: string, bookMark = true) => {
    const filtered = bmDoa.some((item: any) => item.id === id);
    if (filtered) {
      deleteBookMark(id);
    } else {
      addBookMark({ id, title, bookMark });
    }
  };
  return (
    <div className="w-full gap-2 p-2 flex flex-col items-center">
      {(dataDoa as [])?.map((item: TypeDataDoa) => (
        <div className={`w-full p-2`} key={item?.id}>
          <div className="flex items-center gap-2">
            <Border number={item?.id} />
            <h1 className="text-xl text-center lg:text-2xl">{item?.title}</h1>
          </div>
          <div className="flex justify-end my-5 md:my-6">
            <LoveIcon
              handleBookMark={() => onHandleBookMark(item?.id, item?.title)}
              fill={
                bmDoa.some((doa: any) => doa.title === item?.title)
                  ? darkMode
                    ? "white"
                    : "black"
                  : darkMode
                  ? "black"
                  : "white"
              }
            />
          </div>
          <h1
            dir="rtl"
            className="font-sans font-normal md:font-thin leading-relaxed md:leading-loose text-4xl md:my-6"
          >
            {item?.arabic}
          </h1>
          <div className="mt-4">
            <h1 className="text-base capitalize tracking-wider mt-4 mb-2 font-semibold text-left lg:text-md lg:mt-2">
              {item?.latin}
            </h1>
            <p className="text-left text-sm font-normal md:text-base lg:mt-2">
              <span className="font-semibold ">artinya : </span>
              {item?.translation}
            </p>
            <p className="text-left text-sm font-normal md:text-base lg:mt-2">
              <span className="font-semibold ">fawaid : </span>
              {item?.fawaid ? item.fawaid : ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export const DzikirRoute = ({ dataDzikir }: any) => {
  return (
    <div className="w-full gap-2 p-2 flex flex-col items-center">
      {(dataDzikir as any)?.map((dzikir: any, index: number) => (
        <div
          className={`w-full p-2 border-b border-b-gray-300`}
          key={index + 1}
        >
          <div className="flex items-center gap-2">
            <Border number={index + 1} />
            <h1 className="text-xl text-center lg:text-2xl">{dzikir?.title}</h1>
          </div>

          <h1
            dir="rtl"
            className="font-sans font-normal md:font-thin leading-relaxed md:leading-loose text-4xl md:my-6"
          >
            {dzikir?.arabic}
          </h1>
          <h1 className="text-base capitalize tracking-wider mt-4 mb-2 font-semibold text-left lg:text-md lg:mt-2">
            {dzikir?.latin}
          </h1>
          <p className="text-left text-sm font-normal md:text-base lg:mt-2">
            <span className="font-semibold ">artinya : </span>
            {dzikir?.translation}
          </p>
          <p className="text-left text-sm font-normal md:text-base lg:mt-2">
            <span className="font-semibold ">notes : </span>
            {dzikir?.notes}
          </p>
          <p className="text-left text-sm font-normal md:text-base lg:mt-2">
            <span className="font-semibold ">source : </span>
            {dzikir?.source}
          </p>
          <p className="text-left text-sm font-normal md:text-base lg:mt-2">
            <span className="font-semibold ">fawaid : </span>
            {dzikir?.fawaid ? dzikir?.fawaid : ""}
          </p>
        </div>
      ))}
    </div>
  );
};
